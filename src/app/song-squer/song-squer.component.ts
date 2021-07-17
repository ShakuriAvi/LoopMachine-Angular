import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-song-squer',
  templateUrl: './song-squer.component.html',
  styleUrls: ['./song-squer.component.css'],
})
export class SongSquerComponent implements OnInit {
  @Input() loopSong: any;
  @Output() play = new EventEmitter();
  @Output() stop = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  stopSong(event: any): void {
    this.stop.emit(event);
  }
  playSong(event: any): void {
    this.play.emit(event);
  }
}
