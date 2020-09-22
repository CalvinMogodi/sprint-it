import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SelectmapPage } from '../selectmap/selectmap'
import { WaterlessFullBodyTirePage } from '../selectservice/popover/waterlessfullbodytire/waterlessfullbodytire'
import { WaterlessFullBodyInteriorTirePage } from './popover/waterlessfullbodyinteriortire/waterlessfullbodyinteriortire';
import { TireShinePage } from './popover/tireshine/tireshine';
import { InteriorWashPage } from './popover/interiorwash/interiorwash';
import { ExtremeFullWashPage } from './popover/extremefullwash/extremefullwash';
import { ExtremeFullWashBodyShinePage } from './popover/extremefullwashbodyshine/extremefullwashbodyshine';
import { InteriorDisinfectantPage } from './popover/interiordisinfectant/interiordisinfectant';
import { EngineCleanPage } from './popover/engineclean/engineclean';
import { BodyWaxandShinePage } from './popover/bodywaxandshine/bodywaxandshine';
import { BodyWashDryTirePage } from './popover/bodywashdrytire/bodywashdrytire';

/**
 * Generated class for the SelectcarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectservices',
  templateUrl: 'selectservice.html',
})
export class SelectServicesPage {
  public request = {
    carType: '',
    services:[],
    total: 0,
  };
  selectedPriceList: any;
  totalPrice: number = 0.00;

  priceList = [{
    carType: 'Sedan',
    bodyWashDryTire: '100',
    interiorWash: '80',
    tireShine: '10',
    engineClean: '80',
    bodyWaxAndShine: '100',
    interiorDisinfectant: '100',
    waterlessFullBodyTire: '130',
    waterlessFullBodyInteriorTire: '150',
    extremefullWash: '180',
    extremefullwashBodyShine: '280'
  },
  {
    carType: 'Hatchback',
    bodyWashDryTire: '90',
    interiorWash: '80',
    tireShine: '10',
    engineClean: '80',
    bodyWaxAndShine: '100',
    interiorDisinfectant: '100',
    waterlessFullBodyTire: '120',
    waterlessFullBodyInteriorTire: '140',
    extremefullWash: '160',
    extremefullwashBodyShine: '260'
  },
  {
    carType: 'Bakkie',
    bodyWashDryTire: '90',
    interiorWash: '50',
    tireShine: '10',
    engineClean: '80',
    bodyWaxAndShine: '90',
    interiorDisinfectant: '60',
    waterlessFullBodyTire: '120',
    waterlessFullBodyInteriorTire: '170',
    extremefullWash: '160',
    extremefullwashBodyShine: '250'
  },
  {
    carType: 'SUV',
    bodyWashDryTire: '130',
    interiorWash: '90',
    tireShine: '10',
    engineClean: '80',
    bodyWaxAndShine: '150',
    interiorDisinfectant: '100',
    waterlessFullBodyTire: '150',
    waterlessFullBodyInteriorTire: '240',
    extremefullWash: '200',
    extremefullwashBodyShine: '350'
  },
  {
    carType: 'Kombie',
    bodyWashDryTire: '110',
    interiorWash: '90',
    tireShine: '10',
    engineClean: '80',
    bodyWaxAndShine: '150',
    interiorDisinfectant: '120',
    waterlessFullBodyTire: '150',
    waterlessFullBodyInteriorTire: '180',
    extremefullWash: '200',
    extremefullwashBodyShine: '350'
  }]

constructor(public navCtrl: NavController, public navParams: NavParams, public popoverController: PopoverController) {
  if (navParams.data.request.carType != null) {
    this.request.carType = navParams.data.request.carType;
    this.selectedPriceList = this.priceList.filter(p => p.carType.toLowerCase().trim() == this.request.carType.toLowerCase().trim())[0];
     
  }
}

ionViewDidLoad() {
  console.log('ionViewDidLoad SelectcarPage');
}

selectdate(str){
  this.request.carType = str;  
  this.request.total = this.totalPrice;
  this.navCtrl.push(SelectmapPage, { request: this.request });
}

calculateTotal(service: string, amount: number){
  let serviceIsFound = this.request.services.filter(s => s == service);

  if(serviceIsFound.length > 0){
    let index = this.request.services.indexOf(service)
    this.request.services.splice(index, 1);
    this.totalPrice =  Number(this.totalPrice) - Number(amount);
    
  }else{
    this.request.services.push(service);
    this.totalPrice = Number(this.totalPrice) + Number(amount);    
  }
}

proceed(){
  this.request.services = this.request.services;  
  this.request.total = this.totalPrice;
  this.navCtrl.push(SelectmapPage, { request: this.request });
}

presentWaterlessFullBodyTirePopover(ev: any) {
  const popover = this.popoverController.create(WaterlessFullBodyTirePage);
  popover.present();
}

presentWaterlessFullBodyInteriorTirePopover(ev: any) {
  const popover = this.popoverController.create(WaterlessFullBodyInteriorTirePage);
  popover.present();
}

presentTireShinePopover(ev: any) {
  const popover = this.popoverController.create(TireShinePage);
  popover.present();
}

presentInteriorWashPopover(ev: any) {
  const popover = this.popoverController.create(InteriorWashPage);
  popover.present();
}

presentExtremeFullWashPopover(ev: any) {
  const popover = this.popoverController.create(ExtremeFullWashPage);
  popover.present();
}

presentExtremeFullWashBodyShinePopover(ev: any) {
  const popover = this.popoverController.create(ExtremeFullWashBodyShinePage);
  popover.present();
}

presentInteriorDisinfectantPopover(ev: any) {
  const popover = this.popoverController.create(InteriorDisinfectantPage);
  popover.present();
}

presentEngineCleanPopover(ev: any) {
  const popover = this.popoverController.create(EngineCleanPage);
  popover.present();
}

presentBodyWaxandShinePopover(ev: any) {
  const popover = this.popoverController.create(BodyWaxandShinePage);
  popover.present();
}

presentBodyWashDryTirePopover(ev: any) {
  const popover = this.popoverController.create(BodyWashDryTirePage);
  popover.present();
}

}
