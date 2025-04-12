// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms'; // <-- Add this import
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ ReactiveFormsModule,CommonModule],
  standalone: true,
})
export class LoginComponent {
  constructor( private router: Router) { }
  redirectRegister(): void {
    this.router.navigate(['/register']); // Change to your actual product list route
  }
}