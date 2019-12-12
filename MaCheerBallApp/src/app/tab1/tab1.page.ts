import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public alertController:AlertController,public router:Router) {}

  ngOnInit() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'กรอกประวัติส่วนตัว',
      inputs: [
        {
          name: 'name',
          type: 'text',
          label: "ชื่อ-นามสกุล",
          placeholder: 'ชื่อ-นามสกุล'
        },
        {
          name: 'tel',
          type: 'number',
          label: "เบอร์โทร",
          placeholder: 'เบอร์โทร'
        },
   
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.router.navigate(['/tabs/tab1']);
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.router.navigate(['/tab1']);
          }
        }
      ]
    });

    await alert.present();
  }

}
