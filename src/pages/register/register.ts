import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { WelcomePage } from '../welcome/welcome';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase/app';
import { PropertyService } from '../../providers/property-service-rest';
import { Events } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  address:string;
  city:string;
  district:string;
  experience: string;
  id:string;
  name:string;
  phonenumber:string; 
  picture:string;
  tags:string;
  thumbnail:string;
  type:string;

  

  private noteListRef = this.db.object('Workers/asd/');
  workers1: any;
user ={} as User;
userType='User';
togglestate=false;
IsStateChange=true;
  constructor(private aFauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams ,public alertCtrl: AlertController,
    private db: AngularFireDatabase,private camera:Camera,
    public events: Events) {
  
    this.IsStateChange=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.IsStateChange=true;
  }
 async register(user:User){

   
   let id=this.genarateUniqueId();
   

  console.log("register --> "+user.email);
   try{ 
    
    const result = await this.aFauth.auth.createUserWithEmailAndPassword(user.email,user.password);
    if(this.userType=='Worker'){

      this.workers1=
      {
        "id": id,
        "name": user.name,
        "address": user.address,	
        "city": user.city,
        "district": user.district,
        "type": user.type,
        "experience": user.experience,
        "phonenumber":user.phonenumber,
        "picture": "https://media.istockphoto.com/vectors/service-icon-vector-male-person-worker-avatar-profile-with-gear-cog-vector-id900946328",
        "thumbnail": "https://media.istockphoto.com/vectors/service-icon-vector-male-person-worker-avatar-profile-with-gear-cog-vector-id900946328",
        "tags": "colonial",
        "likes":0,
        "unlikes":0
    };
    this.registerWorker();
    }
    
    this.showAlert();
    this.navCtrl.push(WelcomePage,{type:this.userType});
   
   }
   catch(e){
    this.ErrorshowAlert(e.message);
     console.error(e.message);


     
   }


  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Registerd Successfully!',
      subTitle: 'Your registation was successfuly done with <strong style="color: orange"> EasyPooky</strong>',
      buttons: ['OK']
    });
    alert.present();
  }
  ErrorshowAlert(message:string) {
    let alert = this.alertCtrl.create({
      title: '<strong style="color: red">Registation failed!<strong>',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  changeUserTpe(){
    console.log("toggle work");
    if(this.togglestate){
      this.IsStateChange=false;
      console.log("true work");
      this.userType='Worker';
    }else{
      console.log("false user");
      this.userType='User';
      this.IsStateChange=true;
    }
   
  }
  registerWorker() {
    return this.noteListRef.set(this.workers1);
}
addUserToChatRoom(id:string,name:string){
  this.db.list('/chatroom/'+id).push({
    specialMessage: true,
    // message: `${this.username} has joined the room`
  });

}
genarateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
async takePhoto(){
  try {
    const options:CameraOptions={
      quality:50,
      targetHeight:600,
      targetWidth:600,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    
    const result = await this.camera.getPicture(options);
    const image = 'data:image/jpeg;base64,${result}';
    const picture = storage().ref('pistures');
    picture.putString(image,'data_url');


  } catch (error) {
    console.log(error);
  }

}

}
