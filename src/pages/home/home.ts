import { Component} from '@angular/core';
import { NavController, Platform ,ToastController } from 'ionic-angular';
import { SelectcarPage } from '../selectcar/selectcar'
import { LoginPage } from '../login/login'
import { SignupPage } from '../signup/signup'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private toast = null; 
  public hidelogins = false;

  map: any;
  marker: any[];
  markers: any[];
  markerCluster: any;
  currentLocation: any = null;

  allBranches: Observable<IMapData[]>;
  selectedBranches: IMapData[];
  totalQuestions: number;

  baseLat = 24.713552;
  baseLng = 46.675297;

  constructor(private storage: Storage,public navCtrl: NavController, public platform: Platform,  public toastCtrl: ToastController) {
    if (this.platform.ready) {
      setTimeout(() => this.addMarkers(), 500);
      // the app is in PWA mode, we proceed to detect device and browser support:
      let userAgent = navigator.userAgent;
      let isandroid = this.platform.is('android');
      let isios = this.platform.is('ios');

      if (!isandroid && !isios) {
        //window.location.href = 'http://springitapp.com';
      }
    }
    storage.get('userLogin').then((val) => {
      if(val){
        this.hidelogins = true;
      }
    });
  }

  presentToast(message, position, cssclass) {
    // prevent toasts from "stacking":
    if (this.toast) {
        this.toast.dismiss();
        this.toast = null;
    }
    // create a toast:
    this.toast = this.toastCtrl.create({
        message: message,
        closeButtonText: "OK",
        showCloseButton: true,
        cssClass: cssclass,
        position: position,
    });
    this.toast.present();
}

  requst(){
    this.navCtrl.push(SelectcarPage);
  }

  register(){
    this.navCtrl.push(SignupPage);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  addMarkers() {
    var map = this.map;
    this.allBranches.subscribe((branches) => {
      branches.map((branch) => {
        // alert(branch.address);
        let branchmarker = new HWMapJsSDK.HWMarker({
          map: this.map,
          position: {
            lat: this.convertCoordinates(branch.latitude),
            lng: this.convertCoordinates(branch.longitude),
          },
          label: "B",
          icon: {
            opacity: 0.8,
          },
        });

        let infoWindow = new HWMapJsSDK.HWInfoWindow({
          map,
          position: {
            lat: this.convertCoordinates(branch.latitude),
            lng: this.convertCoordinates(branch.longitude),
          },
          content: branch?.retailer_name,
          offset: [0, -40],
        });
        infoWindow.close();
        branchmarker.addListener("click", () => {
          infoWindow.open(branchmarker);
        });
      });
    });
  }

  getLat(): number {
    var LatLng = this.currentLocation.split(",");
    return this.convertCoordinates(LatLng[0]);
  }

  getLong(): number {
    var LatLng = this.currentLocation.split(",");
    return this.convertCoordinates(LatLng[1]);
  }

  convertCoordinates(value: any): number {
    return +parseFloat(value).toFixed(6);
  }

 

}
