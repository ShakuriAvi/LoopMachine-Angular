import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from './AppSettingService';
import { Squer } from './squer.model';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  lstSquersItems: Array<Squer> = [];
  lstNameItems: Array<string> = [];
  subscription: any;
  source = interval(10000);
  text = 'Your Text Here';

  countRound: number = 0;
  lstSquersNextRound: Array<Squer> = [];
  lstSquersThisRound: Array<Squer> = [];
  saveUserAction: Array<String> =[];
  constructor(private json: AppSettingsService) {
    console.log('const');
    json.getData('../assets/lstNameAudio.json').subscribe((result) => {
      this.lstNameItems = result;
      console.log(this.lstNameItems);
      console.log(this.lstNameItems.length);
      this.initSquers();
    });
  }
  initSquers(): void {
    let i;
    for (i = 0; i < this.lstNameItems.length; i++) {
      console.log(this.lstNameItems[i]);
      this.lstSquersItems.push(this.createSqure(this.lstNameItems[i]));
      console.log(this.lstSquersItems[i]);
    }
  }
  createSqure(name: string): Squer {
    let squer: Squer = {
      audioName: name, // Added
      audio: this.initAudio(name),
      status: 'off',
      click: false,
    };

    return squer;
  }
  initAudio(name: string): any {
    let audio = new Audio();
    audio.src = '../assets/music/' + name + '.mp3';
    console.log('initAudio');
    return audio;
  }
  changeStatus(squre: Squer, status: String) {
    squre.status = status;
  }
  playSound(squre: Squer): void {
    console.log('play');
    console.log(this.subscription);
       
    if (this.countRound == 0 && this.subscription !=undefined) {
      this.ngOnDestroy();
    }
    if (this.countRound == 0) {
      this.lstSquersThisRound.push(squre);
        squre.audio.load();
        squre.audio.play();
            this.subscription = this.source.subscribe((val) =>
              this.opensnack()
            );  
      }
      this.saveUserAction.push(' User play the song - ' + squre.audioName);
    this.lstSquersNextRound.push(squre);
    this.countRound++;
    this.changeStatus(squre, 'on');
  }
  ngOnDestroy() {
   this.subscription.unsubscribe();
  }
  stopSound(squre: Squer): void {
    console.log('stop');
    if (this.countRound > 0) {
      this.changeStatus(squre, 'off');
      this.deleteSquer(squre);
      this.countRound--;
    }
  
      
  }
  deleteSquer(squre: Squer) {
    squre.audio.pause();
    const index: number = this.lstSquersNextRound.indexOf(squre);
    if (index !== -1) {
      this.lstSquersNextRound.splice(index, 1);
      this.saveUserAction.push(' User stop the song - ' + squre.audioName);
    }
  }
  opensnack() {
    // I've just commented this so that you're not bombarded with an alert.
    this.lstSquersThisRound = Object.assign([], this.lstSquersNextRound);
    this.lstSquersThisRound.forEach((squre) => {
      squre.audio.load();
      squre.audio.play();
      this.changeStatus(squre, 'on');
     // alert(squre.audioName);
      console.log(squre.audioName);
      console.log('Squers this Round : ' + this.lstSquersThisRound);
      console.log('Squers Next Round : ' + this.lstSquersNextRound.values);
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
