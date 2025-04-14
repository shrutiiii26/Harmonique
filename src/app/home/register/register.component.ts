import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here

@Component({
  selector: 'app-register',
  standalone: true, // Since this is a standalone component
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], // Corrected styleUrl to styleUrls
})
export class RegisterComponent {
  registrationForm!: FormGroup;  // Use non-null assertion operator

  constructor(private fb: FormBuilder,private router: Router) {
    this.createForm();
  }

  // Create the registration form with validators
  createForm() {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Submit the form
  onSubmit() {
    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;
      if (formValues.password === formValues.confirmPassword) {
        console.log('Form submitted successfully!');
        console.log('Full Name:', formValues.fullName);
        console.log('Email:', formValues.email);
  
      } else {
        console.log('Passwords do not match.');
      }
    } else {
      console.log('Form is invalid.');
      this.registrationForm.markAllAsTouched(); // Trigger validation messages
    }
  }
  

  // To check if the control has an error
  get formControls() {
    return this.registrationForm.controls;
  }
}
