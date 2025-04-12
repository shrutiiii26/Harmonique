import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';  // ✅ Import NgIf explicitly
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgIf,RouterLink,RouterModule,RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
  
})

export class SidebarComponent {
  
  @ViewChild('sidebar') sidebar!: ElementRef;
  isSidebarVisible: boolean = false;
  constructor(private router: Router){}

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
