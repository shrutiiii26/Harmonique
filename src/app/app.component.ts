import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, NavigationEnd,Router } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { NgIf } from '@angular/common';  // ✅ Import NgIf explicitly

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarComponent,NgIf,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'harmonique';
  showNavAndSidebar: boolean = true;
  showFooter: boolean = true; 

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideRoutes = ['/login', '/register','/navbar','/',];
        this.showNavAndSidebar = !hideRoutes.includes(event.url);
      }
    });
  }
}
