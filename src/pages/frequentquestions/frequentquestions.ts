import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular'
import { HomePage } from '../home/home';
import { Appsetting } from '../../providers/appsetting';
import { Http, Headers, RequestOptions } from '@angular/http';
import {TabsPage} from '../../pages/tabs/tabs';
import {ProfilePage} from '../../pages/profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the FrequentquestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-frequentquestions',
  templateUrl: 'frequentquestions.html',
})
export class FrequentquestionsPage {
pagedata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
       public appsetting: Appsetting,
    public http: Http,
    public alertCtrl: AlertController,
     public toastCtrl: ToastController,
     public actionSheetCtrl: ActionSheetController,
       private camera: Camera,
    public loadingCtrl: LoadingController) {
    this.getdata();
  }
getdata(){
     let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    
    var options = new RequestOptions({ headers: headers });
     var postdata = {
      pagename:'FaQ (Chef)'
    }
    console.log(postdata);
     var serialized = this.serializeObj(postdata);
     var Loading = this.loadingCtrl.create({
      spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
    dismissOnPageChange:true
    });
    
      Loading.present().then(() => {
    this.http.post(this.appsetting.myGlobalVar +'static/getstaticpagedata', serialized, options)
      .map(res => res.json())
      .subscribe(response => {
          console.log(response);
          if(response.status == true){
              this.pagedata = response.data[0].pagedata
          }
      });
      });
}
 serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FrequentquestionsPage');
  }

}
