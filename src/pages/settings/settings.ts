import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SportProvider } from '../../providers/sport/sport';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface setHistory {
  Dt_countryID: number; Dt_minAge: number; Dt_maxAge: number; Dt_name: string; Dt_Country_code: string;
}

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  minAge: number;
  maxAge: number;
  countryID: number;

  myCountry_Name: string;
  myCountry_code: string;
  countrySP: any;
  count_S: number;
  countryData: any[];

  showID: boolean = false;
  val_ID_dataArray: any;
  flagImage: string;
  myCountry_codeAR: any[];
  //settingsHistory: { Dt_countryID: number; Dt_minAge: number; Dt_maxAge: number; Dt_name: string; Dt_Country_code: string; }[];

  settingsHistory: setHistory[] = [];
  showHistory: boolean = false;
  val_SearchArray: any;
  /*
    settingsHistory: setHistory[] = [
      {
        Dt_countryID: 0,
        Dt_minAge: 0,
        Dt_maxAge: 0,
        Dt_name: "name",
        Dt_Country_code: "Country_code"
      }
    ];
  */

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage, private sp: SportProvider) {
    // this.storage.set("settingsHistory", this.settingsHistory);
  }

  ionViewDidLoad() {
    // callGetCountries() - get all countries on API
    if (this.count_S == null && this.count_S == undefined) {
      this.callGetCountries();

    }
  }

  showAlert() {
    const urlName = window.location.href; //ionic get actual url
    const split_url = urlName.split('/');
    const alert = this.alertCtrl.create({
      title: split_url[2] + " says",
      subTitle: 'Please enter a Country ID',
      buttons: ['OK']
    });
    alert.present();
  }

  save() {
    if (this.countryID == null) {
      this.showAlert();
    } else {
      this.storage.get("countryData")
        .then((val) => {
          if (!val) {
            this.navCtrl.pop();
          }
          else {
            const length_Keys = Object.keys(val).length;
            if (this.countryID <= length_Keys && this.countryID > 0) {
              this.myCountry_Name = val[this.countryID - 1].name;
              this.myCountry_code = val[this.countryID - 1].country_code;
            }
            let dataSettings = {
              Dt_countryID: this.countryID,
              Dt_minAge: this.minAge,
              Dt_maxAge: this.maxAge,
              Dt_name: this.myCountry_Name,
              Dt_Country_code: this.myCountry_code
            };
            this.storage.get("settingsHistory")
              .then((sh) => {
                if (!sh) {
                  //console.log('sh_', sh);
                  //console.log('sh_', sh.length);
                  this.storage.set("settingsHistory", this.settingsHistory);
                }
                else {
                  //console.log('sh_', sh);
                  //console.log('sh_', sh.length);
                  sh.push({
                    Dt_countryID: this.countryID,
                    Dt_minAge: this.minAge,
                    Dt_maxAge: this.maxAge,
                    Dt_name: this.myCountry_Name,
                    Dt_Country_code: this.myCountry_code
                  });
                  this.storage.set("settingsHistory", sh);
                }
              })
            this.storage.set("dataSettings", dataSettings);
            this.navCtrl.pop();
          }
        });
    }
  }

  cancel() {
    this.storage.remove("countryID");
    this.storage.remove("maxAge");
    this.storage.remove("minAge");
    this.navCtrl.pop();
  }

  callGetCountries() {
    this.countrySP = this.sp.getCountries();
    this.countrySP.subscribe((dataSP: { data: any[]; }) => {

      this.count_S = Object.keys(dataSP.data).length;
      this.countryData = dataSP.data;

      for (let i = 0; i < this.countryData.length; i++) {
        if (this.countryData[i].country_code != null && this.countryData[i].country_code != undefined) {

          if (this.countryData[i].country_code == "xk") {
            this.countryData[i].flag = "https://flagcdn.com/64x48/xk.png";
          } else if (this.countryData[i].country_code == "en") {
            this.countryData[i].flag = "https://flagcdn.com/64x48/gb-eng.png";
          } else if (this.countryData[i].country_code == "n") {
            this.countryData[i].flag = "https://flagcdn.com/64x48/gb-nir.png";
          } else if (this.countryData[i].country_code == "w") {
            this.countryData[i].flag = "https://flagcdn.com/64x48/gb-wls.png";
          } else if (this.countryData[i].country_code == "s") {
            this.countryData[i].flag = "https://flagcdn.com/64x48/gb-sct.png";
          } else {
            this.countryData[i].country_code = this.countryData[i].country_code.toUpperCase();
            this.countryData[i].flag = "https://flagsapi.com/" + this.countryData[i].country_code + "/shiny/64.png";
          }
        }
      }
      this.storage.set("count_S", this.count_S);
      this.storage.set("countryData", this.countryData);

      //console.log(">>> callGetCountries = storage countryData and count_S >>> ");
    });
  }

  allCountryID() {
    //console.log(this.showID)
    this.showID = !this.showID;
    //console.log("call all Country ID");
    this.storage.get("countryData")
      .then((val_ID) => {
        if (!val_ID) {
          this.navCtrl.pop();
        }
        else {
          const length_Keys = Object.keys(val_ID).length;
          this.val_ID_dataArray = val_ID.splice(8, length_Keys);
        }

      });
  }

  getHistorySearch() {
    //console.log(this.showID)
    this.showHistory = !this.showHistory;
    //console.log("call all Country ID");
    this.storage.get("settingsHistory")
      .then((val_Search) => {
        if (!val_Search) {
          this.navCtrl.pop();
        }
        else {

          this.val_SearchArray = val_Search;
        }

      });
  }
}