import { Component, ElementRef, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  Duration($event: Event, _t16: number) {
    throw new Error('Method not implemented.');
  }
  updateTime($event: Event, _t16: number) {
    throw new Error('Method not implemented.');
  }
  form: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 3;
  @ViewChild('sidebar') sidebar!: ElementRef;

  isSidebarVisible: boolean = false;
  crossfadeValue: number = 5;
  progressValue: number = 5;
  importedSongs: any[] = [];
  currentSongIndex: number = -1; // To keep track of the current song index
  recommendedSongs: any[] = [
    { title: 'Believer', artist: 'Imagine Dragons' },
    { title: 'Monsters Go Bump', artist: 'Erika Recinos' },
    { title: 'Moment Apart', artist: 'ODESZA' }
  ];
  currentSong: any;

  constructor(private router: Router, private fb: FormBuilder,private changeDetectorRef: ChangeDetectorRef) {
    this.form = this.fb.group({
      step1: ['', Validators.required],
      step2: ['', Validators.required],
      step3: ['', Validators.required]
    });
  }


  loadFiles(event: any): void {
    const files: FileList = event.target.files;
    this.importedSongs = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
    
      const songObj = {
        name: file.name,
        src: url,
        audio: audio,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        artist: 'Unknown Artist',
      };
    
      audio.addEventListener('loadedmetadata', () => {
        songObj.duration = audio.duration;
      });
    
      audio.addEventListener('timeupdate', () => {
        songObj.currentTime = audio.currentTime;
      });
    
      this.importedSongs.push(songObj);
    }
    
  }

  togglePlay(index: number | null): void {
    // Auto-select first song if no song selected
    if ((index === null || index === -1) && this.importedSongs.length > 0) {
      index = 0;
    }

    if (index === null || !this.importedSongs[index]) return;

    const currentSong = this.importedSongs[index];
    this.currentSongIndex = index;

    if (currentSong.audio.paused) {
      // Pause others
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

  onCrossfadeChange(event: any): void {
    this.crossfadeValue = event.target.value;
    const percentage = (this.crossfadeValue / 50) * 100;
    event.target.style.setProperty('--progress', `${percentage}%`);
  }
  

  seekTo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const seekTime = parseFloat(target.value);
    const currentSong = this.importedSongs[this.currentSongIndex];
    
    if (currentSong?.audio) {
        // Ensure seekTime is within valid range
        const clampedTime = Math.max(0, Math.min(seekTime, currentSong.duration || 0));
        
        currentSong.audio.currentTime = clampedTime;
        currentSong.currentTime = clampedTime;
        
        // Optional: Trigger change detection if needed
        this.changeDetectorRef.detectChanges();
    }
}
}
