import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BecomeserviceproviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-becomeserviceprovider',
  templateUrl: 'becomeserviceprovider.html',
})
export class BecomeserviceproviderPage {
  public user = {
    name: '',
    email: '',
    phone: '',
    message: '',
    createdDate: new Date().toString()
  };
  public showError = false;
  public isSuccessful = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
  }
 
  submit() {
    this.showError = false;
    this.isSuccessful = false;
    if (this.user.email != '' && this.user.email != '' && this.user.phone != '' && this.user.message != '') {
     
      this.db.list('/messages').push(this.user).key;
      this.isSuccessful = true;
    }else{
      this.showError = true;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BecomeserviceproviderPage');
  }

}
