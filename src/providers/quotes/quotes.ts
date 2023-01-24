import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuotesProvider {


  constructor(public http: HttpClient) {
  }

  getQuotes() {
    var url = "https://api.quotable.io/random";
    //console.log("CALL getQuotes");
    return this.http.get(url);
  }
}
