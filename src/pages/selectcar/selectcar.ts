import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectServicesPage } from '../selectservice/selectservice'

/**
 * Generated class for the SelectcarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectcar',
  templateUrl: 'selectcar.html',
})
export class SelectcarPage {
  public request = {
    carType: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectcarPage');
  }

  selectCar(str){
    this.request.carType = str;
    this.navCtrl.push(SelectServicesPage, {request: this.request});
  }

}
