import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, NavigationEnd, Router } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from './home/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SidebarService } from './home/services/sidebar.service'; // ✅ import the SidebarService

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NgIf, RouterModule, FooterComponent, HttpClientModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'harmonique';
  showNavAndSidebar: boolean = true;
  showFooter: boolean = true;
  showNavbar: boolean = true;

  isSidebarExpanded = false; // ✅ add this to track sidebar state

  constructor(private router: Router, private sidebarService: SidebarService) { // ✅ inject SidebarService
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideRoutes = ['/login', '/register', '/navbar', '/', '/liked-songs', '/playing-now', '/edit-profile'];
        this.showNavAndSidebar = !hideRoutes.includes(event.url);
        const hideFooterRoutes = ['/login', '/register'];
        this.showFooter = !hideFooterRoutes.includes(event.url);
        const showNavbarRoutes = ['/login', '/register'];
        this.showNavbar = !hideRoutes.includes(event.url);
      }
    });

    // ✅ Subscribe to sidebar expanded state changes
    this.sidebarService.expanded$.subscribe(state => {
      this.isSidebarExpanded = state;
    });
  }

  // ✅ Optional: Method to manually handle sidebar state change
  onSidebarExpandedChange(state: boolean) {
    this.isSidebarExpanded = state;
    this.sidebarService.setExpanded(state);
  }
}