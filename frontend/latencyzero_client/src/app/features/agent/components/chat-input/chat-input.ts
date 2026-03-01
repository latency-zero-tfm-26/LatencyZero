import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput {
  protected readonly s = inject(AgentService);

  newMessage = '';
  file: File | null = null;
  filePreview: string | null = null;
  showModal = false;

  // Enviar mensaje + archivo
  send(el: HTMLTextAreaElement): void {
    if (!this.newMessage.trim() && !this.file) return;

    this.s.sendMessage(this.newMessage, this.file);

    // Reset
    this.newMessage = '';
    this.file = null;
    this.filePreview = null;
    this.showModal = false;
    el.style.height = 'auto';
  }

  // Abrir modal
  openModal(): void {
    this.showModal = true;
  }

  saveFile() {
    if (!this.file) return;
    console.log('Imagen guardada:', this.file.name);
    this.showModal = false;
  }

  // Selección de archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.filePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    } else {
      this.removeFile();
    }
  }

  // Cambiar archivo desde modal
  changeFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => this.onFileSelected(e);
    input.click();
  }

  removeFile(): void {
    this.file = null;
    this.filePreview = null;
  }

  // Teclas Enter / Shift+Enter
  onKeydown(event: KeyboardEvent, el: HTMLTextAreaElement): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send(el);
    }
  }

  // Auto-resize textarea
  autoResize(el: HTMLTextAreaElement): void {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
}
