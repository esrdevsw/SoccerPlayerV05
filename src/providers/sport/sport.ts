import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the SportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SportProvider {

  apiSportKey: string = "3e694bc0-79b3-11ed-8fe3-7f3103d38478";

  constructor(public http: HttpClient) {
  }

  getCountries() {
    var url = `https://app.sportdataapi.com/api/v1/soccer/countries?apikey=${this.apiSportKey}`;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>  CALL getCountries");
    return this.http.get(url);
  }


  getPlayers(myCountry_id: number, min_age: number, max_age: number) {
    //var url = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiSportKey}&country_id=${myCountry_id}&min_age=${min_age}&max_age=${max_age}`;

    var url = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiSportKey}&country_id=${myCountry_id}`;

    if (min_age != null) {
      url = url + `&min_age=${min_age}`;
      console.log('URL_MIN_', url);
    };

    if (max_age != null) {
      url = url + `&max_age=${max_age}`;
      console.log('URL_MAX_', url);
    };

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>  CALL getPlayers");
    console.log(url);

    return this.http.get(url);
  }


}
