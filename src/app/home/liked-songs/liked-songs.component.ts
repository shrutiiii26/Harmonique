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
  crossfadeValue: number = 5;  
  goBack(): void {
    window.history.back();
  }
  // Update the crossfade value
  onCrossfadeChange(event: any): void {
    this.crossfadeValue = event.target.value;

    const percentage = (this.crossfadeValue / 50) * 100;
    event.target.style.setProperty('--progress', `${percentage}%`);
  }

}
