import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { ProductData } from '../models/product.mode';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cart: ProductData[] = [];
  navCtrl: any;

  constructor(private cartService: CartService, private modalCtrl: ModalController, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();

    this.firestore.collection('productList').valueChanges().subscribe(val => console.log(val));
  }

  getTotal(){
    return this.cart.reduce((i, j) => i +  j.Price * j.Amount, 0);
  }

}


