import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, NavParams } from '@ionic/angular';
import { User } from '../models/user.mode';
import { AuthenticateService } from '../services/authentication.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user = {} as User;

  constructor(public navCtrl: NavController, private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.user.email = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

  }
  }
