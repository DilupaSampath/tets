import { Component } from '@angular/core';
import { ActionSheetController, ActionSheet, NavController, NavParams, ToastController } from 'ionic-angular';
import { BrokerDetailPage } from '../broker-detail/broker-detail';
import { PropertyService } from '../../providers/property-service-mock';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {
    noteListRef:any;
    property: any;
    username: string = '';
    message: string = '';
    _chatSubscription;
    messages: object[] = [];

    constructor(private db: AngularFireDatabase,public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public propertyService: PropertyService, public toastCtrl: ToastController) {
        this.property = this.navParams.data;
        propertyService.findById(this.property.id).then(
            property => this.property = property
        );
        this.noteListRef = this.db.object('Workers/asd/');
        this.noteListRef.id=this.navParams.get('id');
       
    }
    addLike(id:string){
        console.log("like id->"+id);
        this.noteListRef.id=id;
        let count=0;
     
        if(count==0){
            console.log("like added->"+(count+1));
            this.noteListRef.update(this.noteListRef.id,{
                "likes":10
            }).then(uUser=>{this.navCtrl.pop();}    );
            // return noteListRef.set({"likes":count+1});
            // return noteListRef.update({"likes":count+1});
        }
    }

    openBrokerDetail(broker) {
        this.navCtrl.push(BrokerDetailPage, broker);
    }

    chat(property) {

    }

    share(property) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }
    

}
