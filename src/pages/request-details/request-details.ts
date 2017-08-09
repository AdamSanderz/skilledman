import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the RequestDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage {

  selectedItem: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = this.navParams.get('item');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDetailsPage');
  }

}
