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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage, private sp: SportProvider) {

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

      this.storage.set("count_S", this.count_S);
      this.storage.set("countryData", this.countryData);

      console.log(">>> callGetCountries = storage countryData and count_S >>> ");
    });
  }

}
