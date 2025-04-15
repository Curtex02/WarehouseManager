import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/RegisterRequest.model';
import { LoginRequest } from '../models/LoginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/security';

  private readonly TOKEN_KEY = 'jwt_token';
  private readonly ROLE_KEY = 'user_role';

  constructor(private readonly http: HttpClient) {}

  register(request:RegisterRequest): Observable<any> {
    // for Testing console.log('Sending registration request:', data);
    return this.http.post(`${this.baseUrl}/register`, request, {
      responseType: 'text',
    });
  }
  
  login(request: LoginRequest): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.baseUrl}/login`, request, { responseType: 'text' })
        .subscribe({
          next: (token: string) => {
            localStorage.setItem(this.TOKEN_KEY, token);
            localStorage.setItem(this.ROLE_KEY, request.role); // or decode from token later
            observer.next(token);
            observer.complete();
          },
          error: err => observer.error(err)
        });
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.ROLE_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUserRole(): string {
    return localStorage.getItem(this.ROLE_KEY) ?? '';
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


}
