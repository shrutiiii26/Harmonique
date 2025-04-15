import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  form: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 3;

  @ViewChild('sidebar') sidebar!: ElementRef;
  isSidebarVisible: boolean = false;
  crossfadeValue: number = 5;  


  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      step1: ['', Validators.required],
      step2: ['', Validators.required],
      step3: ['', Validators.required]
    });
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebar.nativeElement.classList.toggle('active');
  }


  // Calculate the progress percentage based on current step
  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  // Move to the next step
  nextStep() {
    if (this.form.valid && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  // Move to the previous step
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Update the crossfade value
  onCrossfadeChange(event: any): void {
    this.crossfadeValue = event.target.value;
  
    const percentage = (this.crossfadeValue / 50) * 100;
    event.target.style.setProperty('--progress', `${percentage}%`);
  }
}
