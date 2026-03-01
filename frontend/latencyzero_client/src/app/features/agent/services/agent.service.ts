import { Injectable, computed, inject, signal } from '@angular/core';
import { ChatSession } from '../interfaces/session.interface';
import { AgentHttpService } from './agent-http.service';
import { firstValueFrom } from 'rxjs';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Extiende la interfaz del backend con propiedades internas
export interface ChatSessionInternal extends ChatSession {
  messages: ChatMessage[];
  preview: string;
}

@Injectable({ providedIn: 'root' })
export class AgentService {
  private http = inject(AgentHttpService);

  readonly sidebarOpen = signal(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  readonly currentChatId = signal<number | null>(null);
  readonly chatSessions = signal<ChatSessionInternal[]>([]);
  readonly isTyping = signal(false);

  readonly currentSession = computed(
    () => this.chatSessions().find((s) => s.id === this.currentChatId()) ?? null,
  );

  readonly currentMessages = computed(() => this.currentSession()?.messages ?? []);

  readonly groupedSessions = computed(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86_400_000);
    const weekAgo = new Date(today.getTime() - 7 * 86_400_000);
    const monthAgo = new Date(today.getTime() - 30 * 86_400_000);

    const groups: { label: string; sessions: ChatSessionInternal[] }[] = [
      { label: 'Hoy', sessions: [] },
      { label: 'Ayer', sessions: [] },
      { label: 'Últimos 7 días', sessions: [] },
      { label: 'Este mes', sessions: [] },
      { label: 'Más antiguo', sessions: [] },
    ];

    for (const session of this.chatSessions()) {
      const d = new Date(session.create_at);
      if (d >= today) groups[0].sessions.push(session);
      else if (d >= yesterday) groups[1].sessions.push(session);
      else if (d >= weekAgo) groups[2].sessions.push(session);
      else if (d >= monthAgo) groups[3].sessions.push(session);
      else groups[4].sessions.push(session);
    }

    return groups.filter((g) => g.sessions.length > 0);
  });

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  selectChat(id: number): void {
    this.currentChatId.set(id);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      this.sidebarOpen.set(false);
    }
  }

  async newChat(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.create_session());
      const session: ChatSessionInternal = {
        id: response.session,
        session_name: 'Nuevo chat',
        create_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
        messages: [],
        preview: '',
      };

      this.chatSessions.update((sessions) => [session, ...sessions]);
      this.currentChatId.set(session.id);

      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        this.sidebarOpen.set(false);
      }
    } catch (error) {
      console.error('Error creando sesión real', error);
    }
  }

  deleteChat(id: number): void {
    this.chatSessions.update((sessions) => sessions.filter((s) => s.id !== id));
    if (this.currentChatId() === id) {
      this.currentChatId.set(null);
    }
  }

  async sendMessage(content: string): Promise<void> {
    const trimmed = content.trim();
    if (!trimmed || this.isTyping()) return;

    const chatId = this.currentChatId();
    if (!chatId) return;

    this.chatSessions.update((sessions) =>
      sessions.map((s) =>
        s.id === chatId
          ? {
              ...s,
              preview: trimmed,
              messages:
                s.messages?.length > 0
                  ? [
                      ...s.messages,
                      {
                        id: crypto.randomUUID(),
                        role: 'user',
                        content: trimmed,
                        timestamp: new Date(),
                      },
                    ]
                  : [
                      {
                        id: crypto.randomUUID(),
                        role: 'user',
                        content: trimmed,
                        timestamp: new Date(),
                      },
                    ],
            }
          : s,
      ),
    );

    this.isTyping.set(true);

    try {
      const response = await firstValueFrom(this.http.createMessage(chatId, trimmed, 'llm', null));
      this.chatSessions.update((sessions) =>
        sessions.map((s) =>
          s.id === chatId
            ? {
                ...s,
                messages: [
                  ...(s.messages ?? []),
                  {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: response.bot_message,
                    timestamp: new Date(),
                  },
                ],
              }
            : s,
        ),
      );
    } catch (error) {
      console.error('Error enviando mensaje', error);
    } finally {
      this.isTyping.set(false);
    }
  }

  startWithSuggestion(text: string): void {
    this.newChat();
    setTimeout(() => this.sendMessage(text), 50);
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(date);
  }

  private generateTitle(content: string): string {
    return content.length > 40 ? content.slice(0, 40) + '…' : content;
  }

  async loadSessions(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.getMySessions());

      // Mapea la respuesta real del backend a ChatSessionInternal
      const sessions: ChatSessionInternal[] = response.sessions.map((s) => ({
        ...s,
        messages: [],
        preview: '',
      }));

      this.chatSessions.set(sessions);

      if (sessions.length > 0) {
        this.currentChatId.set(sessions[0].id);
      }
    } catch (error) {
      console.error('Error cargando sesiones', error);
    }
  }
}
