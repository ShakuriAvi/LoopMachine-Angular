import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <app-header></app-header>
    <app-main-page></app-main-page>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'moveo-task';
}
