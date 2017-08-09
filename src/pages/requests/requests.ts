import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {RequestDetailsPage} from "../request-details/request-details";


/**
 * Generated class for the RequestsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {

  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.loadALL();
  }


  loadAllTheRequests() {
    let headers = new Headers();
    headers.append("Accept", '*/*');
    headers.append('Content-Type', 'application/json');
    headers.append('API_KEY', 'YXV0b2FwcGFwaWtleTEyMzQ1Ng==');
    let options = new RequestOptions({headers: headers});


    return new Promise(resolve => {
      this.http.get('http://127.0.0.1:8080/api/forms/1/submissions', options)
        .map(res => res.json())
        .subscribe(results => {
          // console.log(results);
          this.items = results.result;
          // console.log(this.items);
          resolve(this.items);
        })
    });
  }

  loadALL(){
    this.loadAllTheRequests().then(data => {
      this.items = data;
      let all_items: any =[];
      for (var key in this.items){
        if (this.items.hasOwnProperty(key)){
          var element = this.items[key].value;
        }

        all_items.push(element);
        // console.log(all_items);
      }
       this.items = all_items;

      console.log(this.items);
    })
  }


  itemTapped(event, item) {
    this.navCtrl.push(RequestDetailsPage, {
      item: item
    });
  }


}
