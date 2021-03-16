import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collectionName = 'productList';

  constructor( private firestore: AngularFirestore) { }

  createProduct(product){
    return this.firestore.collection(this.collectionName).add(product);
  }

  ViewProduct(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  UpdateProduct(id, product){
    this.firestore.doc(this.collectionName + '/' + id).update(product);
  }

  deleteProduct(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
