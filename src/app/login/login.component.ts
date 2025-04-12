// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms'; // <-- Add this import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ ReactiveFormsModule,CommonModule],
  standalone: true,
})
export class LoginComponent {
}