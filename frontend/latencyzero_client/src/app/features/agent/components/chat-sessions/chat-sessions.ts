import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'chat-sessions',
  imports: [],
  templateUrl: './chat-sessions.html',
  styleUrl: './chat-sessions.css',
  host: { class: 'flex h-full min-h-0 shrink-0' },
})
export class ChatSessions {
  protected readonly s = inject(AgentService);

  constructor() {
    this.s.loadSessions();
  }

  deleteChat(id: number, event: Event): void {
    event.stopPropagation();
    this.s.deleteChat(id);
  }
}
