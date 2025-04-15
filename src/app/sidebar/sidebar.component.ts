import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';  // ✅ Import NgIf explicitly
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-sidebar',
  imports: [NgIf, CommonModule, RouterModule, FormsModule], // Import FormsModule here
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @ViewChild('sidebar') sidebar!: ElementRef;
  isSidebarVisible: boolean = false;

  constructor(private router: Router) { }

  // Toggle sidebar visibility
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebar.nativeElement.classList.toggle('active');
  }

  // Navigate to home
  home() {
    this.router.navigateByUrl('/home');
  }
  settings() {
    this.router.navigateByUrl('/settings');
  }

  // Navigate to liked songs
  likedsongs() {
    this.router.navigateByUrl('/liked-songs');
  }

  // Search-related properties
  searchVisible = false;
  searchQuery = ''; // Holds the search input value

  // Toggle the visibility of the search input
  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }
}
