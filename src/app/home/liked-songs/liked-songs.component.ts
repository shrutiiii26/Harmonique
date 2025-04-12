import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-liked-songs',
  imports: [CommonModule, RouterModule],
  templateUrl: './liked-songs.component.html',
  styleUrl: './liked-songs.component.scss'
})
export class LikedSongsComponent {
  goBack(): void {
    window.history.back();
  }
  
}
