import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly baseUrl = 'http://localhost:8080/stockapi'; // Adjust your base path

  constructor(private readonly http: HttpClient) { }

  getAllStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getStockBySku(sku: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sku/${sku}`);
  }

  addStock(stockData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, stockData);
  }

  updateStockBySku(sku: number, stockData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/sku/${sku}`, stockData);
  }

  deleteStockBySku(sku: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/sku/${sku}`);
  }

  decreaseStockBySku(sku: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/decrease/sku/${sku}`, quantity);
  }

  increaseStockBySku(sku: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/increase/sku/${sku}`, quantity);
  }

  getLowStockAlerts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alerts`);
  }
}
