import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  registerUser(user) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(user) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(user.email, user.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }
}