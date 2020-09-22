import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { SelectcarPage } from '../pages/selectcar/selectcar';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfilePage } from '../pages/profile/profile';
import { MyrequestPage } from '../pages/myrequest/myrequest';
import { SplashPage } from '../pages/splash/splash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  displayname: string = '';
  displayusername: string = '';

  pages: Array<{title: string, component: any}>;

  constructor(public storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public modalCtrl: ModalController, public db: AngularFireDatabase) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },    
      { title: 'Book a Wash', component: SelectcarPage } 
    ];
    this.storage.get('userId').then((val) => {
      if (val) {
        this.db.database.ref().child('users/' + val).once('value', snapshot => {
          var result = snapshot.val();
          if (result) {
            this.displayname = result.name + ' ' + result.surname;
            this.displayusername = result.email;
            this.pages.push( { title: 'Profile', component: ProfilePage });
            this.pages.push( { title: 'My Requests', component: MyrequestPage });
            this.pages.push( { title: 'History', component: HistoryPage });
            this.pages.push( { title: 'Become a Service Provider', component: HistoryPage });
            this.pages.push( { title: 'Terms & Conditions', component: HistoryPage });
            this.pages.push( { title: 'Logout', component: HistoryPage });
          }
        });
      
      }else{
        this.pages.push( { title: 'Become a Service Provider', component: HistoryPage });
      this.pages.push( { title: 'Terms & Conditions', component: HistoryPage });
      this.pages.push( { title: 'Logout', component: HistoryPage });
      }
    
    });
      
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      let splash = this.modalCtrl.create(SplashPage);
            splash.present();
      //this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Book a Wash')
      this.nav.push(page.component);
    else if(page.title == 'History')
      this.nav.push(page.component);
    else if(page.title == 'My Requests')
      this.nav.push(page.component);
    else if(page.title == 'Profile')
      this.nav.push(page.component);
    else if(page.title == 'Become a Service Provider')
      window.open("https://springitapp.com/registerasspringitcleaner.html",'_system', 'location=yes');      
    else if(page.title == 'Terms & Conditions')
      window.open("https://springitapp.com/terms.html",'_system', 'location=yes');
    else{
      this.nav.setRoot(page.component);
    }    
  }
}
