import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Supplier {
  id: number;
  name: string;
  contactInfo: string;
  rating: string;
}

interface ProductMap {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private readonly apiUrl = 'http://localhost:8080/supplier';

  constructor(private readonly http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  insertSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}/insert`, supplier);
  }

  updateSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/update/${id}`, supplier);
  }

  deleteSupplier(id: number): Observable<Supplier> {
    return this.http.delete<Supplier>(`${this.apiUrl}/delete/${id}`);
  }
}
