import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['STAFF', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value;
      this.authService.login(loginRequest).subscribe({
        next: (token) => {
          this.authService.storeToken(token);
          console.log('Token stored:', token);
          this.router.navigate(['/dashboard']);
          },
        error: (err) => console.error('Token missing in response')
      });
    }
  }
}
