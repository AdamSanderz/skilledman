import {Component, ViewChild} from '@angular/core';
import {NavController, LoadingController, AlertController, Loading} from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myNav') nav: NavController;

  loading: Loading;
  registerCredentials = {mobile: '',email: '', password: '', response: ''};


  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController) {
    this.checkuser();

  }


  login() {
    let headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('API_KEY', 'YXV0b2FwcGFwaWtleTEyMzQ1Ng==');
    let options = new RequestOptions({headers: headers});

    // let postParams = {
    //   mobile: '09123227346',
    //   password: '123456'
    //
    // };
    let postParams = {
      mobile: this.registerCredentials.mobile,
      password: this.registerCredentials.password

    };

    this.http.post("http://127.0.0.1:9000/api/users/newlogin", postParams, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);// Error getting the data
      });
  }


  showLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }

  checkuser() {
    this.storage.get('name').then((val) => {
      console.log('Your mobile is', val);
    });

    this.storage.get('mobile').then((mobile) => {
      console.log('Your mobile is', mobile);
    });

  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }




  }
