import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewProduct } from '../../models/NewProduct.model';
import { InventoryService } from '../../services/inventory.service';
import { SupplierService, Supplier } from '../../services/supplier.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  role: string = '';
  email: string = '';
  selectedTab: string = 'inventory';
  newProduct: NewProduct = new NewProduct();
  inventoryItems: any[] = [];
  suppliers: Supplier[] = [];
  newSupplier: Supplier = { id: 0, name: '', contactInfo: '', rating: '' };

  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
    private readonly inventoryService: InventoryService,
    private readonly supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.email = this.authService.getEmail() ?? 'Guest';
      this.role = this.authService.getRole() ?? 'STAFF';
      this.loadInventory();
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (tab === 'inventory') {
      this.loadInventory(); // Refresh inventory when switching to inventory tab
    }
    if (tab === 'suppliers') {
      this.loadSuppliers();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  loadInventory(): void {
    this.inventoryService.getAllStock().subscribe({
      next: (data) => {
        this.inventoryItems = data;
      },
      error: (err) => {
        console.error('Failed to load inventory', err);
      }
    });
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  addSupplier() {
    this.supplierService.insertSupplier(this.newSupplier).subscribe(() => this.loadSuppliers());
  }

  updateSupplier() {
    this.supplierService.updateSupplier(this.newSupplier.id, this.newSupplier).subscribe(() => this.loadSuppliers());
  }

  deleteSupplier() {
    this.supplierService.deleteSupplier(this.newSupplier.id).subscribe(() => this.loadSuppliers());
  }

  addProduct(): void {
    this.authService.addInventoryStock(this.newProduct).subscribe({
      next: (res) => {
        alert('Product added successfully!');
        this.newProduct = { sku: 0, name: '', description: '', initial_stock: 0 };
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product.');
      }
    });
  }

  updateProduct(): void {
    if (!this.newProduct.sku) {
      alert('SKU is required for update.');
      return;
    }
    this.authService.updateProduct(this.newProduct.sku, this.newProduct).subscribe({
      next: (res) => {
        alert('Product updated successfully!');
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product.');
      }
    });
  }
  
  deleteProduct() {
    if (!this.newProduct.sku) {
      alert('Please enter a SKU to delete.');
      return;
    }
  
    const confirmed = confirm(`Are you sure you want to delete product with SKU ${this.newProduct.sku}?`);
  
    if (confirmed) {
      this.authService.deleteProduct(this.newProduct.sku).subscribe({
        next: (responce: any) => {
          alert(`Product with SKU ${this.newProduct.sku} deleted successfully.`);
          // Reset form
          this.newProduct = { sku: 0, name: '', description: '', initial_stock: 0 };
        },
        error: (error: any) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product.');
        }
      });
    }
  }
  
  getProductDetails(): void {
    if (!this.newProduct.sku) {
      alert('SKU is required to fetch product.');
      return;
    }
    this.authService.getProductDetails(this.newProduct.sku).subscribe({
      next: (product) => {
        this.newProduct = product;
        alert('Product details loaded.');
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        alert('Failed to fetch product.');
      }
    });
  }

}