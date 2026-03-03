import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface SessionData {
  username: string;
  token: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class JwtService {

  private readonly TOKEN_KEY = 'auth_session';

  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  private role: string | null = null;
  private name: string | null = null;

  constructor() {
    this.init();
  }

  public init(): void {
    const stored = localStorage.getItem(this.TOKEN_KEY);

    if (!stored) {
      this.clear();
      return;
    }

    try {
      const data: SessionData = JSON.parse(stored);

      if (this.validateToken(data.token)) {
        this.tokenSubject.next(data.token);
        this.role = data.role;
        this.name = data.username;
      } else {
        this.clear();
      }
    } catch {
      this.clear();
    }

    console.log('INIT ROLE:', this.role);
  }

  public setSession(data: SessionData): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(data));

    this.tokenSubject.next(data.token);
    this.role = data.role;
    this.name = data.username;

    console.log('LOGIN ROLE:', this.role);
  }

  private validateToken(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp > now : false;
    } catch {
      return false;
    }
  }

  public clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSubject.next(null);
    this.role = null;
    this.name = null;
  }

  public getToken(): string | null {
    return this.tokenSubject.value;
  }

  public getRole(): string | null {
    return this.role;
  }

  public getName(): string | null {
    return this.name;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public hasRole(role: string): boolean {
    return this.role === role;
  }
}
