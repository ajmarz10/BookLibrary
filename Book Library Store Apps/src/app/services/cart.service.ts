import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductData } from '../models/product.mode';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  product = {} as ProductData;
  bookList: ProductData[];
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(private firestore: AngularFirestore, public productService: ProductService) { }

  getProducts(){
    return this.product;
  }

  getCart(){
    return this.cart;
  }

  getCartItemCount(){
    return this.cartItemCount;
  }

  addProduct(product){
    let added = false;
    for (let p of this.cart){
      if (p.id === product.id){
        p.Amount += 1;
        added = true;
        break;
      }
    }
    if (!added){
      product.Amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product){
    for (let [index, p] of this.cart.entries()){
      if (p.id === product.id){
        p.Amount -= 1;
        if (p.Amount == 0){
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product){
    for (let [index, p] of this.cart.entries()){
      if (p.id === product.id){
        this.cartItemCount.next(this.cartItemCount.value - p.Amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
