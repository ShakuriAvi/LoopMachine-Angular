import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import{AppSettingsService} from '@angular/AppSettingsService';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule  } from '@angular/common/http';
import { AppSettingsService } from './main-page/AppSettingService';
import { HeaderComponent } from './header/header.component';
import { SongSquerComponent } from './song-squer/song-squer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    SongSquerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppSettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
