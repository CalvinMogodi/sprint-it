import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { SelectcarPage } from '../selectcar/selectcar';

/**
 * Generated class for the MyrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myrequest',
  templateUrl: 'myrequest.html',
})
export class MyrequestPage {
  requests = [];

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public storage: Storage) {
    storage.get('userId').then((val) => {
      if(val){
        this.db.database.ref().child('requests').orderByChild('userId').equalTo(val).on('value', snapshot => {
          var result = snapshot.val();
          if (result != null) {
            snapshot.forEach(snap => {
              var request = snap.val();
              if(request.status == 'New' || request.status == 'In Prograss'){
                this.requests.push(request); 
              }                    
            });       
          }
        });
      }
    });
  }

  requst(){
    this.navCtrl.push(SelectcarPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyrequestPage');
  }

}
