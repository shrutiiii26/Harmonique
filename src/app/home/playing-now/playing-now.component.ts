import { Component } from '@angular/core';

@Component({
  selector: 'app-playing-now',
  imports: [],
  templateUrl: './playing-now.component.html',
  styleUrl: './playing-now.component.scss'
})
export class PlayingNowComponent {
  songs = [
    {
      title: "Believer",
      artist: "IMAGINE DRAGON",
      image: "../assets/Mask Group (1).png"
    },
    {
      title: "Blinding Lights",
      artist: "THE WEEKND",
      image: "../assets/Mask Group (1).png"
    },
    {
      title: "Let Me Down Slowly",
      artist: "ALEC BENJAMIN",
      image: "../assets/Mask Group (1).png"
    }
  ];
  currentIndex = 0;

  get currentSong() {
    return this.songs[this.currentIndex];
  }

  selectSong(index: number) {
    this.currentIndex = index;
  }

  nextSong() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
  }

  prevSong() {
    this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
  }
}
