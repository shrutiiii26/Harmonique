import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, NavigationEnd,Router } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { NgIf } from '@angular/common';  // ✅ Import NgIf explicitly
import { FooterComponent } from './home/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './home/navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarComponent,NgIf,RouterModule,FooterComponent,HttpClientModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'harmonique';
  showNavAndSidebar: boolean = true;
  showFooter: boolean = true; 
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideRoutes = ['/login', '/register','/navbar','/','/playing-now','/edit-profile'];
        this.showNavAndSidebar = !hideRoutes.includes(event.url);
        const hideFooterRoutes = ['/login', '/register'];
        this.showFooter = !hideFooterRoutes.includes(event.url);
        const showNavbarRoutes = ['/login', '/register'];
        this.showNavbar = !hideRoutes.includes(event.url);
      }
    });
  }
}
