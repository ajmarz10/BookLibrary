import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

export interface ProductData{
  Images: string;
  Name: string;
  Price: number;
  Author: string;
  Amount: number;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  bookList = [];
  productData: ProductData;
  productForm: FormGroup;

  constructor(
    private firebaseService: ProductService,
    public fb: FormBuilder
  ) {
    this.productData = {} as ProductData;
  }

  ngOnInit() {

    this.productForm = this.fb.group({
      Images: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      Amount: ['', [Validators.required]]
    })

    this.firebaseService.ViewProduct().subscribe(data => {

      this.bookList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Images: e.payload.doc.data()['Images'],
          Name: e.payload.doc.data()['Name'],
          Price: e.payload.doc.data()['Price'],
          Author: e.payload.doc.data()['Author'],
          Amount: e.payload.doc.data()['Amount']
        };
      })
      console.log(this.bookList);

    });
  }

  CreateProduct() {
    console.log(this.productForm.value);
    this.firebaseService.createProduct(this.productForm.value).then(resp => {
      this.productForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveProduct(rowID) {
    this.firebaseService.deleteProduct(rowID);
  }

}
