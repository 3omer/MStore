import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Category } from 'app/common/category';
import { Product } from 'app/common/product';
import { ProductService } from 'app/services/product.service';
import { selectCategories } from 'app/state/category.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.css']
})
export class ProductFormDialogComponent implements OnInit {

  feedbackMessage = ""
  editingMode = false
  intitialInputs: Product = {
    name: '',
    price: null,
    categoryId: null,
    description: ''
  }
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    categoryId: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  categories: Category[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: Product,
    private productService: ProductService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    private store: Store
  ) {
    this.editingMode = this.dialogData?.id ? true : false
  }

  ngOnInit(): void {
    // TODO: categories will be reloaded on every add !!
    // TODO: unsub
    // TODO: list is not loaded if you didn't land on categories page first the (Load() is only dispatched from categories page) 
    this.store.select(selectCategories).subscribe(cats => this.categories = cats)
    // use passed value to override initial vaues
    const { id, ...formInputs } = this.dialogData
    this.productForm.setValue(Object.assign(this.intitialInputs, formInputs))
  }

  onSubmit() {
    console.log("NewProduct onSubmit(): ", this.productForm.value);
    if (this.editingMode) {
      console.log('updating ...');
      const modProduct: Product = this.productForm.value
      modProduct.id = this.dialogData.id
      this.productService.update(this.dialogData.id, modProduct)
        .subscribe(res => {
          if (res) {
            this.feedbackMessage = "Product updated"
            this.toastr.success("Category updated successfully")
            this.dialogRef.close()
          }
          else {
            this.feedbackMessage = "Something went wrong"
            this.toastr.error("Something went wrong")
          }
        })
    }
    else {
      console.log('createing ...');
      this.productService.create(this.productForm.value as Product)
        .subscribe(newProduct => {
          if (newProduct) {
            this.feedbackMessage = "Product added successfully"
            this.toastr.success("Category added successfully")
            this.dialogRef.close()

          }
          else {
            this.feedbackMessage = "Something went wrong"
            this.toastr.error("Something went wrong")
          }
        })
    }
  }
}
