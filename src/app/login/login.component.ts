import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service.ts.service'; // Update path if needed
import { HttpErrorResponse } from '@angular/common/http';
import { ServicesService } from '../../services.service'; // ✅ Import ServicesService
// import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule,],
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private servicesService: ServicesService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  redirectRegister(): void {
    this.router.navigate(['/register']);
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.servicesService.login(this.loginForm.value).subscribe(
        (response: any) => {
          this.authService.storeToken(response.token); // Store token using AuthService
          this.router.navigate(['/home']);             // Navigate after successful login
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed:', error.message);
          alert('Login failed: Invalid credentials or server error');
        }
      );
    }
  }
  
}
