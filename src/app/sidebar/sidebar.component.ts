import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';  // ✅ Import NgIf explicitly

@Component({
  selector: 'app-sidebar',
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebar.nativeElement.classList.toggle('active');
  }
}
