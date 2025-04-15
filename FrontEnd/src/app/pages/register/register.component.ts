import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ correct import
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  name = '';
  password = '';
  role = 'STAFF';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  register() {
    const user = {
      email: this.email,
      name: this.name,
      password: this.password,
      role: this.role
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        console.log('Registered!', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error registering', err);
      }
    });
  }
}
