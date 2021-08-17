import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Category } from 'app/common/category';
import { Product } from 'app/common/product';
import { RequestStatus } from 'app/common/requestStatus';
import { ProductService } from 'app/services/product.service';
import { selectCategories } from 'app/state/category.selectors';
import { selectCreateProductRequestStatus } from 'app/state/product.selectors';
import { ToastrService } from 'ngx-toastr';
import { skip, takeWhile } from 'rxjs/operators';
import * as ProductActions from "../../state/product.actions";
@Component({
  selector: 'product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.css']
})
export class ProductFormDialogComponent implements OnInit, OnDestroy {

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
  componentActive: boolean = true

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
    
    // handle toastr
    this.store.select(selectCreateProductRequestStatus)
    .pipe(skip(1), takeWhile(() => this.componentActive))
    .subscribe(status => {
      switch (status) {
        case RequestStatus.succeeded:
          console.log(`${ this.editingMode ? "update" : "create" } passed`);
          this.toastr.success(`Product ${ this.editingMode ? "updated" : "created" } successfully`)
          this.dialogRef.close()
          break;

        case RequestStatus.failed:
          console.log(`${ this.editingMode ? "update" : "create" } failed`);
          this.toastr.error("Something went wrong")
          break;

        default:
          console.log(`unknown request status while handling ${ this.editingMode ? 'update' : 'create'} operation. respoonse status is ${status}`);
          break;
      }
    }
    )
  }

  onSubmit() {
    console.log("NewProduct onSubmit(): ", this.productForm.value);
    if (this.editingMode) {
      console.log('updating ...');
      const modProduct: Product = this.productForm.value
      modProduct.id = this.dialogData.id
      this.store.dispatch(ProductActions.UpdateProduct({ product: modProduct }))
    }
    else {
      console.log('createing ...');
      this.store.dispatch(ProductActions.CreateProduct({ product: this.productForm.value as  Product }))
    }
  }

  ngOnDestroy() {
    this.componentActive = false
  }
}
