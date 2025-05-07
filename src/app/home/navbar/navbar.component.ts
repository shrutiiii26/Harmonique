import { Component, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  // @ViewChild('menu') menu!: Menu;


  menuItems = [
    { label: 'Profile', icon: 'bi bi-person-circle', },
    { label: 'Settings', icon: 'bi bi-gear' },
    { label: 'Logout', icon: 'bi bi-box-arrow-right' }
  ];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  // Search-related property
  searchQuery: string = ''; // Binds to input field

  // User menu logic (stub)
  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    // TODO: Implement dropdown toggle or menu open logic here
    console.log('Toggle user menu clicked');
  }

  // Optional: method to handle search action (e.g., when user presses Enter)
  handleSearch(): void {
    console.log('Search input:', this.searchQuery);
    // Add search logic here (e.g., API call, navigation, filtering)
  }
  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
    console.log("Logout successful, localStorage cleared.");
  }
  dropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click')
  closeDropdown(): void {
    this.dropdownOpen = false;
  }

}
