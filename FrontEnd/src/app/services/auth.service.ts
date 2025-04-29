import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../models/RegisterRequest.model';
import { LoginRequest } from '../models/LoginRequest.model';
import { NewProduct } from '../models/NewProduct.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl = 'http://localhost:8080';
  TOKEN_KEY: string = localStorage.getItem('token') ?? '';
  headers: any = null;

  constructor(private readonly http: HttpClient) {}

  register(request:RegisterRequest): Observable<any> {
    // for Testing console.log('Sending registration request:', data);
    return this.http.post(`${this.baseUrl}/security/register`, request, {
      responseType: 'text',
    });
  }
  
  login(request: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/security/login`, request, {
      responseType: 'text',
    }).pipe(
      tap((token: string) => {
        localStorage.setItem('token', token);             // Save token
        localStorage.setItem('email', request.email);     // Save user info
        localStorage.setItem('role', request.role);       
      })
    );
  }
  
  getEmail(): string | null {
    return localStorage.getItem('email');
  }
  
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    this.TOKEN_KEY = '';
    localStorage.clear();
  }

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  addInventoryStock(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/inventory/products/add`, data);
  }

  updateProduct(sku: number, product: NewProduct): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/inventory/products/update/${sku}`, product);
  }

  deleteProduct(sku: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/inventory/products/${sku}`);
  }

  getProductDetails(sku: number): Observable<NewProduct> {
    return this.http.get<NewProduct>(`${this.baseUrl}/api/v1/inventory/products/${sku}`);
  }


}
