import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Song {
  name: string;
  src: string;
  audio: HTMLAudioElement;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  artist: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private songs: Song[] = [];
  private currentIndex: number = -1;

  private songsSubject = new BehaviorSubject<Song[]>([]);
  private currentSongSubject = new BehaviorSubject<Song | null>(null);

  songs$ = this.songsSubject.asObservable();
  currentSong$ = this.currentSongSubject.asObservable();

  loadFiles(files: FileList, randomImageCallback: () => string): void {
    this.songs = [];

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);

      const song: Song = {
        name: file.name,
        src: url,
        audio: audio,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        artist: 'Unknown Artist',
        image: randomImageCallback()
      };

      audio.addEventListener('loadedmetadata', () => {
        song.duration = audio.duration;
      });

      audio.addEventListener('timeupdate', () => {
        song.currentTime = audio.currentTime;
      });

      this.songs.push(song);
    });

    this.songsSubject.next(this.songs);
  }

  togglePlay(index: number | null = null): void {
    if ((index === null || index === -1) && this.songs.length > 0) {
      index = 0;
    }

    if (index === null || !this.songs[index]) return;

    const selected = this.songs[index];
    this.currentIndex = index;

    this.songs.forEach((song, i) => {
      if (i !== index && song.audio) {
        song.audio.pause();
        song.isPlaying = false;
      }
    });

    if (selected.audio.paused) {
      selected.audio.play();
      selected.isPlaying = true;
    } else {
      selected.audio.pause();
      selected.isPlaying = false;
    }

    this.songsSubject.next(this.songs);
    this.currentSongSubject.next(selected);
  }

  nextSong(): void {
    if (this.songs.length === 0) return;
    let nextIndex = (this.currentIndex + 1) % this.songs.length;
    this.togglePlay(nextIndex);
  }

  previousSong(): void {
    if (this.songs.length === 0) return;
    let prevIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    this.togglePlay(prevIndex);
  }

  seekTo(time: number): void {
    const currentSong = this.songs[this.currentIndex];
    if (!currentSong) return;

    currentSong.audio.currentTime = time;
    currentSong.currentTime = time;

    this.songsSubject.next(this.songs);
    this.currentSongSubject.next(currentSong);
  }

  getCurrentTimeFormatted(): string {
    const song = this.songs[this.currentIndex];
    return song ? this.formatTime(song.currentTime) : '0:00';
  }

  getDurationFormatted(): string {
    const song = this.songs[this.currentIndex];
    return song ? this.formatTime(song.duration) : '0:00';
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  get currentSongIndex(): number {
    return this.currentIndex;
  }

  get importedSongs(): Song[] {
    return this.songs;
  }
}
