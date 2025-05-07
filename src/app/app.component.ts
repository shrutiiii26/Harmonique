<<<<<<< HEAD
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
=======
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterModule, NavigationEnd, Router } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgIf, NgClass } from '@angular/common'; // ✅ Import NgClass here
import { FooterComponent } from './home/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './home/navbar/navbar.component';
import { Subscription, filter } from 'rxjs';

const NO_LAYOUT_ROUTES = ['/login', '/register'];
const HIDE_FOOTER_ROUTES = ['/login', '/register'];
const HIDE_NAVBAR_ROUTES = ['/login', '/register'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    NgIf,
    NgClass // ✅ Fix: Add this
  ],
>>>>>>> e7278caf119b0a83afd2948acaa1bfd4e1dd2828
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
<<<<<<< HEAD

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
=======
export class AppComponent implements OnDestroy {
  title = 'harmonique';
  showNavAndSidebar = true;
  showFooter = true;
  showNavbar = true;
  layoutClass = 'with-layout';

  private routerSubscription: Subscription;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.url.split('?')[0]; // Remove query params

          this.showNavAndSidebar = !NO_LAYOUT_ROUTES.includes(currentUrl);
          this.showFooter = !HIDE_FOOTER_ROUTES.includes(currentUrl);
          this.showNavbar = !HIDE_NAVBAR_ROUTES.includes(currentUrl);
          this.layoutClass = NO_LAYOUT_ROUTES.includes(currentUrl) ? 'no-layout' : 'with-layout';
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
>>>>>>> e7278caf119b0a83afd2948acaa1bfd4e1dd2828
  }

  // ✅ Optional: Method to manually handle sidebar state change
  onSidebarExpandedChange(state: boolean) {
    this.isSidebarExpanded = state;
    this.sidebarService.setExpanded(state);
  }
}