import {Component, ViewChild} from '@angular/core';
import {NavController, LoadingController, AlertController, Loading} from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import {RequestsPage} from "../requests/requests";


import {AuthServiceProvider} from "../../providers/auth-service/auth-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myNav') nav: NavController;

  loading: Loading;
  logindata = {mobile: '', email: '', password: '', response: ''};


  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController, public auth: AuthServiceProvider) {
    this.checkuser();

  }


  checkUser() {
    let userLogin = this.auth.getUser();
    console.log(userLogin);
    if (userLogin) {
      let alert = this.alertCtrl.create({
        title: 'Welcome',
        subTitle: 'you are in!',
        buttons: ['Ok']
      });
      alert.present(prompt);
      this.navCtrl.push(RequestsPage);
    }
  }


  /*loginUser(credentials){
    this.auth.loginn(credentials);
    let userLogin = this.auth.getUser();
    if (userLogin) {
      this.navCtrl.push(RequestsPage);
    }
  }*/


  login(credentials) {
    this.auth.login(credentials);
    let userlogin = this.auth.getUser();
    if (userlogin) {
      this.navCtrl.push(RequestsPage);
    }

  }


  /*login() {
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
      mobile: this.logindata.mobile,
      password: this.logindata.password

    };

    this.http.post("http://autoapp.ir/api/users/newlogin", postParams, options)
      .map(res => res.json())
      .subscribe(data => {
        /!*if (data.status == true){

        }*!/
        console.log(data);
      }, error => {
        console.log(error);// Error getting the data
      });
  }*/

  /*loginTapped(event, item) {
    this.navCtrl.push(RequestsPage, {
      item: item
    });
  }*/


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
