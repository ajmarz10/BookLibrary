import { Component, OnInit } from '@angular/core';
import { ProductData } from '../models/product.mode';
import { ProductService } from '../services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-add',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {
  bookList = [];
  productData: ProductData;
  productForm: FormGroup;

  constructor(
    private firebaseService: ProductService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private firestore: AngularFirestore) {}


  ngOnInit() {

    this.firebaseService.ViewProduct().subscribe(data => {

      this.bookList = data.map(e => {
        return {
          id: e.payload.doc.id,
          Images: e.payload.doc.data()['Images'],
          Name: e.payload.doc.data()['Name'],
          Price: e.payload.doc.data()['Price'],
          Author: e.payload.doc.data()['Author'],
          Amount: e.payload.doc.data()['Amount'],

        };
      })
      console.log(this.bookList);

    });
  }

  async deleteProduct(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    await this.firestore.doc("productList/" + id).delete();
    //dismiss loader
    (await loader).dismiss();
   }
   showToast (message:string){
   this.toastCtrl.create({
   message: message,
   duration: 3000
   }).then(toastData => toastData.present());
   }

}
