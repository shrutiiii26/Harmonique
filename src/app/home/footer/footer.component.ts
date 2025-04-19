import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-footer',
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  importedSongs: any[] = [];
  currentSongIndex: number = -1;

  togglePlay(index: number | null): void {
    if ((index === null || index === -1) && this.importedSongs.length > 0) {
      index = 0;
    }

    if (index === null || !this.importedSongs[index]) return;

    const currentSong = this.importedSongs[index];
    this.currentSongIndex = index;

    if (currentSong.audio.paused) {
      this.importedSongs.forEach((song, i) => {
        if (i !== index && song.audio) {
          song.audio.pause();
          song.isPlaying = false;
        }
      });
      currentSong.audio.play();
      currentSong.isPlaying = true;
    } else {
      currentSong.audio.pause();
      currentSong.isPlaying = false;
    }
  }

  get currentTime(): string {
    const currentSong = this.importedSongs[this.currentSongIndex];
    return currentSong ? this.formatTime(currentSong.currentTime) : '0:00';
  }

  get duration(): string {
    const currentSong = this.importedSongs[this.currentSongIndex];
    return currentSong ? this.formatTime(currentSong.duration) : '0:00';
  }

  
  private formatTime(sec: number): string {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  seekTo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const seekTime = parseFloat(target.value);
    const currentSong = this.importedSongs[this.currentSongIndex];

    if (currentSong?.audio) {
      const clampedTime = Math.max(0, Math.min(seekTime, currentSong.duration || 0));
      currentSong.audio.currentTime = clampedTime;
      currentSong.currentTime = clampedTime;
      this.changeDetectorRef.detectChanges();
    }
  }

}
