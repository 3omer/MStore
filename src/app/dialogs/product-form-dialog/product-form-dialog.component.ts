import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'app/common/category';
import { Product } from 'app/common/product';
import { CategoryService } from 'app/services/category.service';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.css']
})
export class ProductFormDialogComponent implements OnInit {

  feedbackMessage = ""
  editingMode = false
  intitialInputs : Product = {
    name: '',
    price: null,
    categoryId: null,
    description: ''
  }
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(),
    categoryId: new FormControl(),
    description: new FormControl('')
  })

  categories: Category[]
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: Product,
    private categoryService: CategoryService,
    private productService: ProductService
      ) {
    this.editingMode = this.dialogData?.id ? true : false
   }

  ngOnInit(): void {
    // TODO: categories will be reloaded on every add !!
    this.categoryService.getAll().subscribe(cats => this.categories = cats)

    // use passed value to override initial vaues
    const { id, ...formInputs } = this.dialogData
    this.productForm.setValue(Object.assign(this.intitialInputs, formInputs))
  }

  onSubmit() {
    console.log("NewProduct onSubmit(): ",  this.productForm.value);
    if(this.editingMode) {
      console.log('updating ...');
      const modProduct: Product = this.productForm.value
      modProduct.id = this.dialogData.id
      this.productService.update(this.dialogData.id, modProduct)
      .subscribe(res => {
        if (res) this.feedbackMessage = "Product updated"
        else this.feedbackMessage = "Something went wrong"
      })
    }
    else {
      console.log('createing ...');
      this.productService.create(this.productForm.value as Product)
      .subscribe(newProduct => {
        if (newProduct) this.feedbackMessage = "Product added successfully"
        else this.feedbackMessage = "Something went wrong"
      })
    }
  }
}