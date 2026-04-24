import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { AuthUser } from '../skills/models/auth-user.model';


@Injectable({providedIn: 'root'})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:5050/api/auth';

  user = signal<AuthUser | null>(this.getUserFromStorage());
  isLoggedIn = computed(() => !!this.user());

  constructor(private http: HttpClient) { }

  login(data: { email: string; password: string}){
    return this.http.post<AuthUser>(`${this.apiUrl}/login`, data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user);
      })
    );
  }

  register(data: { username: string; email: string; password: string }){
    return this.http.post<AuthUser>(`${this.apiUrl}/register`, data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user);
      })
    );
  }

  getToken(): string | null{
    return this.user()?.accessToken || null;
  }

  logout(): void{
    localStorage.removeItem('user');
    this.user.set(null);
  }

  getCurrentUserId(): string | null{
    return this.user()?.id || null;
  }

  private getUserFromStorage(): AuthUser | null{
    const rawUser = localStorage.getItem('user');
    return rawUser ? JSON.parse(rawUser) : null;
  }
}
