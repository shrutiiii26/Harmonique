import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [SidebarComponent,RouterLink,RouterModule,],
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  constructor(private router: Router){}
  @ViewChild('sidebar') sidebar!: ElementRef;
  isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebar.nativeElement.classList.toggle('active');
  }
  
  home(){
    this.router.navigateByUrl('/home')
  }

  likedsongs(){
    this.router.navigateByUrl('/liked-songs')
  }
}
