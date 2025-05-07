import {
  SidebarService
} from '../home/services/sidebar.service';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterModule,
  NavigationEnd
} from '@angular/router';

import {
  CommonModule,
  NgIf
} from '@angular/common';

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
  isExpanded = false;
  selectedItem: number | null = null;

  menuItems: MenuItem[] = [
    { id: 1, label: 'Home', icon: 'assets/Dashboard.png', route: '/home' },
    { id: 2, label: 'Liked Songs', icon: 'assets/heart.png', route: '/liked-songs' },
    { id: 3, label: 'About Us', icon: 'assets/chat.png', route: '/about-us' },
    { id: 4, label: 'FAQs', icon: 'assets/question.png', route: '/faq' },
    { id: 5, label: 'Settings', icon: 'assets/gear.png', route: '/settings' }
  ];

  constructor(private router: Router, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const activeItem = this.menuItems.find(
          (item) => item.route === this.router.url
        );
        if (activeItem) {
          this.selectedItem = activeItem.id;
        }
      }
    });
  }

  expandSidebar(): void {
    this.isExpanded = true;
    this.sidebarService.setExpanded(true);
  }
  
  collapseSidebar(): void {
    this.isExpanded = false;
    this.sidebarService.setExpanded(false);
  }

  selectItem(item: MenuItem): void {
    if (this.router.url !== item.route) {
      this.router.navigate([item.route]);
    }
  }
}