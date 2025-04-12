// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms'; // <-- Add this import
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ ReactiveFormsModule,CommonModule,RouterModule],
  standalone: true,
})
export class LoginComponent {
  constructor( private router: Router) { }
  redirectRegister(): void {
    this.router.navigate(['/register']);
  }
}