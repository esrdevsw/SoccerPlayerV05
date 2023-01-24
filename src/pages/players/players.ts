import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SportProvider } from '../../providers/sport/sport';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the PlayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class PlayersPage {

  myCountryID: string;

  dataArray = [];
  bulkEdit = true;
  sortDirection = 0;
  sortKey = null;

  message_players: string;
  list_length: number;



  constructor(public navCtrl: NavController, public navParams: NavParams, private sp: SportProvider, private storage: Storage) {

    this.readPlayers()
  }

  readPlayers() {
    this.storage.get("dataSettings")
      .then((val) => {
        const countryID = val.Dt_countryID
        const minAge = val.Dt_minAge
        const maxAge = val.Dt_maxAge
        console.log(">>> query data <<<");
        console.log('countryID_', countryID);
        console.log('minAge_', minAge);
        console.log('maxAge_', maxAge);

        this.myCountryID = countryID;

        this.sp.getPlayers(countryID, minAge, maxAge).subscribe(res => {
          //console.log(">>> answer to query <<<");
          //console.log('res_', res);
          this.dataArray = res['data'];
          //console.log(">>> dataArray <<<");
          this.list_length = this.dataArray.length;
          this.sort();
        });
      });
  }

  sortBy(key: any) {
    //console.log("sort inicial = " + this.sortDirection)
    this.sortKey = key;
    this.sortDirection++;
    //console.log("sort click = " + this.sortDirection)
    this.sort();
  }

  sort() {
    if (this.sortDirection == 1) {
      this.dataArray = this.dataArray.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.dataArray = this.dataArray.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    } else {
      this.dataArray = this.dataArray.sort((n1, n2) => {
        if (n1.player_id > n2.player_id) {
          return 1;
        }
        if (n1.player_id < n2.player_id) {
          return -1;
        }
        return 0;
      });
      this.sortDirection = 0;
      this.sortKey = null;
    }
    //console.log(this.dataArray)
  }

  removeRow(index: number) {
    this.dataArray.splice(index, 1);
  }



}
