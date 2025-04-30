import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderRequest {
  supplier_id: number;
  productSkusAndQuantities: { [sku: number]: number };
}

export interface Supplier {
  id: number;
  name: string;
  contactInfo: string;
  rating: number;
}

export interface Product {
  sku: number;
  name: string;
  quantity: number;
}

export interface Order {
  orderId: string;
  productList: Product[];
  totalPrice: number;
  supplier: Supplier;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = 'http://localhost:8080/orders';

  constructor(private readonly http: HttpClient) {}

  placeOrder(order: OrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/place`, order);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${orderId}`);
  }

  // Add update and get by ID as needed
}
