import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  register(data: any){
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout(){
    localStorage.removeItem('user');
  }

  isLogged(){
    return !!this.getUser();
  }
}
