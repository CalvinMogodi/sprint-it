import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public db: AngularFireDatabase) {
    this.storage.get('userId').then((val) => {
      if (val) {
        this.db.database.ref().child('users/' + val).once('value', snapshot => {
          var result = snapshot.val();
          if (result) {
            this.user = result;
          }
        });      
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
