import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuotesProvider } from '../providers/quotes/quotes';
import { SportProvider } from '../providers/sport/sport';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from "@ionic/storage";
import { SettingsPage } from '../pages/settings/settings';
import { PlayersPage } from "../pages/players/players";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    PlayersPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    PlayersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    QuotesProvider,
    SportProvider
  ]
})
export class AppModule { }
