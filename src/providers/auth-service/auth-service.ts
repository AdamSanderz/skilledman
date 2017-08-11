import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Storage} from '@ionic/storage';
import {AlertController, Events, Loading, LoadingController} from "ionic-angular";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  loading: Loading;
  userlogin: any = {};


  constructor(public http: Http, public storage: Storage, public events: Events, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public loginn(credentials) {
    if (credentials.mobile === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.mobile === "email");


        this.storage.set('name', credentials.password);
        this.storage.set('mobile', credentials.mobile);

        //localStorage.setItem('user', JSON.stringify(resp));

        observer.next(access);
        observer.complete();
      });
    }
  }

  public login(posted) {
    this.showLoading();

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('API_KEY', 'YXV0b2FwcGFwaWtleTEyMzQ1Ng==');
    let options = new RequestOptions({headers: headers});

    let postParams = {mobile: posted.mobile, password: posted.password};
    //this.http.post("http://127.0.0.1:8000/api/users/newlogin", postParams, options)
    this.http.post("http://autoapp.ir/api/users/newlogin", postParams, options)
      .map(res => res.json())
      .subscribe(data => {

        if (data.status) {
          localStorage.setItem('user', JSON.stringify(data.result));
          this.events.publish('user:login', JSON.stringify(data.result), Date.now());
          this.loading.dismiss();
        } else {
          this.showError(data.result);
        }
        return data;
      }, error => {
        console.log(error);
        this.showError('خطایی در رابطه با سرور رخ داده است');
        return false;
      });
  }

  public register(posted) {
    this.showLoading();

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('API_KEY', 'YXV0b2FwcGFwaWtleTEyMzQ1Ng==');
    let options = new RequestOptions({headers: headers});

    let postParams = {
      mobile: posted.mobile,
      name: posted.name,
      car_brand: posted.car_brand,
      car_model: posted.car_model
    }
    this.http.post("http://autoapp.ir/api/users/register", postParams, options)
      .map(res => res.json())
      .subscribe(data => {

        if (data.status) {
          this.loading.dismiss();
        } else {
          this.showError(data.result);
        }
        return data;
      }, error => {
        console.log(error);
        this.showError('خطایی در رابطه با سرور رخ داده است');
        return false;
      });
  }


  getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))
    } else {
      return false;
    }
  }

  logout() {
    this.events.publish('user:logout', this.getUser(), Date.now());
    localStorage.setItem('user', '');

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'لطفا صبر کنید ...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'خطا',
      subTitle: text,
      buttons: ['خب']
    });
    alert.present(prompt);
  }


}
