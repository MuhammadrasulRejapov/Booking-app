import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5202/api/Auth';
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) { 
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem(this.tokenKey);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) { 
      return !!this.getToken();
    }
    return false;
  }
}