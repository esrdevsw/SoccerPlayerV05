import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuotesProvider } from '../../providers/quotes/quotes';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs/Observable';
import { SettingsPage } from '../settings/settings';
import { SportProvider } from '../../providers/sport/sport';

interface CountryData {
  country_id: number,
  name: string,
  country_code: string,
  continent: string
}

interface setHistory {
  Dt_countryID: number; Dt_minAge: number; Dt_maxAge: number; Dt_name: string; Dt_Country_code: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public countryData: CountryData[];

  quotes: Observable<any>;
  //countrySP: any;
  //count_S: number;

  author: string;
  content: string;
  tags: string[];

  countryID: number;
  messageHome: string;
  //dataGet: any[];


  // myCountry_id: number;
  myCountry_Name: string;
  myCountry_code: string;
  flag: any;
  flagImage: string;
  flagStatus: boolean = false;

  settingsHistory: setHistory[] = [];


  //myMaxAge: number;
  //myMinAge: number;

  constructor(public navCtrl: NavController, private qt: QuotesProvider, private storage: Storage, private sp: SportProvider) {

    //    console.log(" >>>>>    constructor    <<<<<")

    this.quotes = this.qt.getQuotes();
    this.storage.set("settingsHistory", this.settingsHistory);

    //  console.log(" >>>>>  END  constructor END   <<<<<")
  }

  ionViewCanEnter() {
    //console.log('HOME ionViewCanEnter A');
    // quotesData() - set home page with quotes
    this.quotesData();
  }

  ionViewWillEnter() {
    //console.log('HOME ionViewWillEnter C');

    this.readCountryID();
  }

  clickSettings() {
    this.flagStatus = false;
    this.navCtrl.push(SettingsPage);
  }

  quotesData() {
    this.quotes.subscribe(data => {
      this.author = data.author;
      this.tags = data.tags;
      this.content = data.content;
    });
  }

  readCountryID() {
    this.storage.get("dataSettings")
      .then((val) => {

        if (val == null && val == undefined) {
          this.flagStatus = false;
          this.messageHome = "CountryID doesn't exist";

        } else if (val != null && (val.Dt_Country_code == null && val.Dt_Country_code == undefined)) {
          this.flagStatus = false;
          this.countryID = val.Dt_countryID;
          this.messageHome = "CountryID " + this.countryID + " doesn't exist";

        } else {
          this.flagStatus = true;
          this.countryID = val.Dt_countryID;
          this.myCountry_Name = val.Dt_name;

          if (val.Dt_Country_code != null && val.Dt_Country_code != undefined) {
            this.myCountry_code = (val.Dt_Country_code).toUpperCase();
          }

          this.getFlag();

          this.messageHome = "CountryID " + this.countryID + " is " + this.myCountry_Name + " (" + this.myCountry_code + ")";

        }

      });
  }


  getFlag() {

    //this.flagImage = "https://flagsapi.com/" + this.myCountry_code + "/shiny/64.png";

    this.storage.get("countryData")
      .then((val) => {
        //console.log('val_', val[this.countryID - 1].flag);
        this.flagImage = val[this.countryID - 1].flag

      });


  }

}