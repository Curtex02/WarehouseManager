import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewProduct } from '../../models/NewProduct.model';
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

  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.email = this.authService.getEmail() ?? 'Guest';
      this.role = this.authService.getRole() ?? 'STAFF';
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
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
}