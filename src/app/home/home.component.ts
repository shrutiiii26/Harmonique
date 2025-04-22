import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AudioPlayerService } from '../home/services/audio-player.service'; // Adjust the path as needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  form: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 3;

  @ViewChild('sidebar') sidebar!: ElementRef;

  isSidebarVisible: boolean = false;
  crossfadeValue: number = 5;
  progressValue: number = 5;

  importedSongs: any[] = [];
  currentSongIndex: number = -1;

  availableImages = [
    'assets/51c547366f2853da1052e531f4bfe4d5.jpg',
    'assets/770a9cca1e543e6edeae6747db9522d2.jpg',
    'assets/956b070b9df64cdd16d966caa1e016bf.jpg',
    'assets/aa53683a96a23571867f1eafa0d845a1.jpg',
    'assets/Listening To Music GIF - Head Phones Music Recording Studio - Discover & Share GIFs.gif',
    'assets/Mask Group.png'
  ];
  

  recommendedSongs: any[] = [
    { title: 'Believer', artist: 'Imagine Dragons' },
    { title: 'Monsters Go Bump', artist: 'Erika Recinos' },
    { title: 'Moment Apart', artist: 'ODESZA' }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    public audioService: AudioPlayerService
  ) {
    this.form = this.fb.group({
      step1: ['', Validators.required],
      step2: ['', Validators.required],
      step3: ['', Validators.required]
    });
  }

  getRandomImage(): string {
    const index = Math.floor(Math.random() * this.availableImages.length);
    return this.availableImages[index];
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
        image: this.getRandomImage()
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
    return this.audioService.getCurrentTimeFormatted();
  }

  get duration(): string {
    return this.audioService.getDurationFormatted();
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
    const input = event.target as HTMLInputElement;
    this.audioService.seekTo(parseFloat(input.value));
  }



  Duration(_event: Event, _t16: number) {
    throw new Error('Method not implemented.');
  }

  updateTime(_event: Event, _t16: number) {
    throw new Error('Method not implemented.');
  }
}
