import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT } from '../../config';
import { JwtService } from '../../core/services/jwt.service';
import { RegisterDTO } from '../interfaces/register-dto.interface';
import { Router } from '@angular/router';
import { AgentService } from '../../features/agent/services/agent.service';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _username = signal<string | null>(null);

  private http = inject(HttpClient);
  private jwt = inject(JwtService);
  private router = inject(Router);
  private agentService = inject(AgentService);

  authStatus = computed<AuthStatus>(() => this._authStatus());
  username = computed(() => this._username());

  constructor() {
    const isAuth = this.jwt.isAuthenticated();
    this._authStatus.set(isAuth ? 'authenticated' : 'not-authenticated');

    if (isAuth) {
      this._username.set(this.jwt.getName());
    }
  }

// auth.service.ts
login(username: string, password: string): Observable<{ success: boolean; error?: string }> {
  return this.http
    .post<{ username: string; token: string; role: string }>(
      LOGIN_ENDPOINT,
      { username, password },
      { withCredentials: true }
    )
    .pipe(
      map((response) => {
        this.jwt.setSession(response);
        this._authStatus.set('authenticated');
        this._username.set(response.username);
        return { success: true };
      }),
      catchError((error) => {
        let msg = 'Error desconocido';
        if (error.status === 401) msg = 'Usuario o contraseña incorrectos';
        else if (error.status === 403) msg = 'Usuario bloqueado o no autorizado';
        else if (error.status === 500) msg = 'Error del servidor';
        return of({ success: false, error: msg });
      })
    );
}

  register(registerDTO: RegisterDTO): Observable<boolean> {
    return this.http.post<{ created: boolean }>(REGISTER_ENDPOINT, registerDTO).pipe(
      map((response) => {
        if (response.created) {
          return true;
        }
        return false;
      }),
      catchError((error) => {
        return of(false);
      }),
    );
  }

  logout() {
    const token = this.jwt.getToken();
    this.jwt.clear();
    this._authStatus.set('not-authenticated');
    this._username.set(null);
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
    if (token) {
      this.http
        .post(
          LOGOUT_ENDPOINT,
          {},
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .subscribe();
    }

    this.agentService.chatSessions.set([]);
    this.agentService.currentChatId.set(null);
  }
}
