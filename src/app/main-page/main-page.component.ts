import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from './AppSettingService';
import { Squer } from '../model/squer.model';
import { interval, Subscription } from 'rxjs';
import { Song } from '../model/song.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  lstSquersItems: Array<Squer> = [];
  lstItems: Array<Song> = [];
  subscription: any; // for start interval
  loopTime = interval(10000); //time interval ten second
  countSong: number = 0; //  count active songs (songs that wait to next loop or work in current loop)
  lstSquersNextRound: Array<Squer> = []; //save the next Squers that play
  lstSquersThisRound: Array<Squer> = []; //save the current Squers that play
  saveUserAction: Array<String> = [];
  lstRecordingLoop: Array<Song> = []; //save the record Squers that play
  lastRecordFromLocalStorage: Array<Song> = [];
  recordOnOrOff: boolean = false;

  constructor(private json: AppSettingsService) {
    console.log('const');
    json.getData('assets/lstNameAudio.json').subscribe((result) => {
      this.lstItems = result;
      console.log(this.lstItems);
      this.initSquers();
    });
  }
  initSquers(): void {
    let i;
    for (i = 0; i < this.lstItems.length; i++) {
      console.log(this.lstItems[i]);
      this.lstSquersItems.push(this.createSquer(this.lstItems[i]));
      console.log(this.lstSquersItems[i]);
    }
  }
  createSquer(song: Song): Squer {
    let squer: Squer = {
      audioName: song.name, // Added
      audio: this.initAudio(song.name),
      status: 'off',
      click: false,
      id: song.id,
    };

    return squer;
  }
  initAudio(name: string): any {
    let audio = new Audio();
    audio.src = 'assets/music/' + name + '.mp3';
    console.log('initAudio');
    return audio;
  }
  changeStatus(songSquer: Squer, status: String) {
    songSquer.status = status;
  }
  playSound(songSquer: Squer): void {
    console.log(this.subscription);
    if (
      this.lstSquersNextRound.indexOf(songSquer) != -1) {
      return;
    } else if (this.countSong == 0) {
      this.lstSquersThisRound.push(songSquer);
      songSquer.audio.load();
      songSquer.audio.play();

      this.subscription = this.loopTime.subscribe((val) =>
        this.openInterval()
      );
    }

    this.saveUserAction.push(' User play the song - ' + songSquer.audioName);
    this.lstSquersNextRound.push(songSquer);
    if (this.recordOnOrOff == true) {
      //add to record list element that work
      let tempSong: Song = {
        id: songSquer.id,
        name: songSquer.audioName,
      };

      this.lstRecordingLoop.push(tempSong);
    }
    this.countSong++;
    this.changeStatus(songSquer, 'On');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  stopSound(songSquer: Squer): void {
    if (this.countSong == 0) {
      return;
    } else if (this.countSong == 1) {
      this.ngOnDestroy();
    }
    this.changeStatus(songSquer, 'Off');
    this.deleteSquer(songSquer);
    this.countSong--;
  }
  deleteSquer(songSquer: Squer) {
    songSquer.audio.pause();
    const index: number = this.lstSquersNextRound.indexOf(songSquer);
    if (index !== -1) {
      this.lstSquersNextRound.splice(index, 1);
      this.saveUserAction.push(' User stop the song - ' + songSquer.audioName);
    }
  }
  /*
    each interval work ten second
  */
  openInterval() {
   
      this.lstSquersThisRound = Object.assign([], this.lstSquersNextRound); // copy the next loop to current loop

    this.lstSquersThisRound.forEach((songSquer) => {
      songSquer.audio.load();
      songSquer.audio.play();
      this.changeStatus(songSquer, 'On');
      // alert(squre.audioName);
      console.log(songSquer.audioName);
      console.log('Squers this Round : ' + this.lstSquersThisRound);
      console.log('Squers Next Round : ' + this.lstSquersNextRound.values);
    });
  }

  onRecord(): void {
    this.recordOnOrOff = true;
      this.saveUserAction.push(' User click On Record ');
  }
  offRecord(): void {
    this.recordOnOrOff = false;
    this.lstRecordingLoop.forEach((songSquer) => {
      this.lastRecordFromLocalStorage.push(songSquer);
    });
    localStorage.setItem(
      'record',
      JSON.stringify(this.lastRecordFromLocalStorage)
    );
    this.lstRecordingLoop = [];
     this.saveUserAction.push(' User click Off Record ');
  }
  playOrStopRecord(): void {

      this.lastRecordFromLocalStorage = JSON.parse(
        localStorage.getItem('record') || '[]'
      );
      if (this.lastRecordFromLocalStorage.length == 0) {
        alert('There are not recordings in the system');
        return;
      }
      this.lastRecordFromLocalStorage.forEach((song) => {
        let songSquer = this.createSquer(song);
        songSquer.audio.load();
        songSquer.audio.play();
      });
    this.saveUserAction.push(' User Play last Record ');
  }
  ngOnInit(): void {}
}
