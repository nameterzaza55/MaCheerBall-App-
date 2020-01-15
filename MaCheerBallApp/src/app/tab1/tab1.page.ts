import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { user } from "../Models/user";
import { poll } from "../Models/poll";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  dataBallMacth: any;
  dataUserVote: FormGroup;
  name: string;
  tel: string;
  dataVote: any = {
    "name": null,
    "tell": null
  };
  addUserVote: poll;
  user: user;
  countHomevote: any;
  countAwayvote: any;
  test: any[] = [];
  constructor(public alertController: AlertController,
    public router: Router,
    public callApi: CallApiService,
    public formBuilder: FormBuilder) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.presentAlertPrompt();
    this.getBallMacth();
  }

  getBallMacth() {
    this.callApi.getUserAll().subscribe((it) => {
      this.dataBallMacth = it;
      console.log(this.dataBallMacth);

    })
  }

  userVoteHomeTeam(t) {
    this.callApi.getUserById(this.addUserVote.pollId).subscribe(it =>{
    console.log(it);
    
    })
    this.addUserVote = t;
    console.log(this.addUserVote);

    console.log(this.callApi.user.nameUser);
    console.log(this.callApi.user.telUser);

    // this.dataVote.name = this.callApi.user.nameuser
    // this.dataVote.tell = this.callApi.user.teluser
    this.user = this.callApi.user;
    console.log(this.user);
    this.test.push(this.user)
    console.log(this.test);

    if (this.addUserVote.voteHomeTeam == null) {
      this.addUserVote.voteHomeTeam = [];
      this.addUserVote.voteHomeTeam.push(this.user);

    } else {
      this.addUserVote.voteHomeTeam.push(this.user);
    }
    this.countHomevote = this.addUserVote.voteHomeTeam.length;
    // console.log(this.countHomevote);

    console.log(this.addUserVote.voteHomeTeam);
    this.callApi.voteHome(this.addUserVote.pollId, this.addUserVote).subscribe(it => {
      console.log(it);


    });
  }

  userVoteAwayTeam(t) {
    this.addUserVote = t;
    console.log(this.addUserVote);

    console.log(this.callApi.user.nameUser);
    console.log(this.callApi.user.telUser);

    // this.dataVote.name = this.callApi.user.nameuser
    // this.dataVote.tell = this.callApi.user.teluser
    this.user = this.callApi.user;
    console.log(this.user);
    this.test.push(this.user)
    console.log(this.test);
    if (this.addUserVote.voteAwayTeam == null) {
      this.addUserVote.voteAwayTeam = [];
      this.addUserVote.voteAwayTeam.push(this.user);
    } else {
      this.addUserVote.voteAwayTeam.push(this.user);
    }

    this.countAwayvote = this.addUserVote.voteAwayTeam.length;

    // this.addUserVote.voteHomeTeam.push(this.user);
    console.log(this.addUserVote);
    console.log(this.addUserVote.voteAwayTeam);
    this.callApi.voteAway(this.addUserVote.pollId, this.addUserVote).subscribe(it => {
      console.log(it);

    });

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'กรอกประวัติส่วนตัว',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'ชื่อ-นามสกุล',

        },
        {
          name: 'tel',
          type: 'number',
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
          handler: data => {
            this.getBallMacth();
            console.log('Confirm Ok');
            this.callApi.user.nameUser = data.name;
            this.callApi.user.telUser = data.tel;

            console.log(this.callApi.user.nameUser);
            console.log(this.callApi.user.telUser);

            this.router.navigate(['/tabs/tab1']);
          }
        }
      ]
    });

    await alert.present();
  }

}
