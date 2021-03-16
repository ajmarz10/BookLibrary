import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { BehaviorSubject, AsyncSubject, Observable } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { ProductData } from '../models/product.mode';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public product: Observable<ProductData>;
  bookList: any;
  term = '';
  cart = [];
  cartItemCount = new BehaviorSubject(0);

  constructor(
    private cartService: CartService, 
    private modalCtrl: ModalController,
    private firestoreService: ProductService,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    private firestore: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.firestore.collection('productList').valueChanges().subscribe(val => console.log(val));

    this.bookList = this.firestoreService.ViewProduct().subscribe(data => {

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

    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

}
