import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ProductData } from '../models/product.mode';
@Component({
 selector: 'app-product-edit',
 templateUrl: './product-edit.page.html',
 styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
 product = {} as ProductData;
 id: any;
 constructor(
 private actRoute: ActivatedRoute,
 private loadingCtrl: LoadingController,
 private firestore: AngularFirestore,
 private toastCtrl: ToastController,
 private navCtrl: NavController
 ) {
 this.id = this.actRoute.snapshot.paramMap.get("id");
 }
 ngOnInit() {
 this.getProductById(this.id);
 }
 async getProductById(id: string){
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();
 this.firestore.doc("productList/" + id)
 .valueChanges()
 .subscribe(data => {
 this.product.Images = data["Images"];
 this.product.Name = data["Name"];
 this.product.Price = data["Price"];
 this.product.Author = data["Author"];
 this.product.Amount = data["Amount"];
 });
 //dismiss loader
 (await loader).dismiss();
 }
 async updateProduct(product: ProductData){
 if(this.formValidation()) {
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();

 try{

 await this.firestore.doc("productList/" + this.id).update(product);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();

 //redirect to view post page
 this.navCtrl.navigateRoot("product-view");
 }
 }
 formValidation(){
 if(!this.product.Images){
 this.showToast("Enter images link url");
 return false;
 }
 if(!this.product.Name){
 this.showToast("Enter product name");
 return false;
 }
 if(!this.product.Price){
 this.showToast("Enter product price");
 return false;
 }
 if(!this.product.Author){
  this.showToast("Enter author name");
  return false;
  }
  if(!this.product.Amount){
    this.showToast("Enter amount of the product");
    return false;
    }
    return true;
    }
    showToast (message:string){
    this.toastCtrl.create({
    message: message,
    duration: 3000
    })
    .then(toastData => toastData.present());
    }
   }