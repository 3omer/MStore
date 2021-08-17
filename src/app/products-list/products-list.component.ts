import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Product } from 'app/common/product';
import { RequestStatus } from 'app/common/requestStatus';
import { ProductFormDialogComponent } from 'app/dialogs/product-form-dialog/product-form-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { skip, takeWhile } from 'rxjs/operators';
import * as ProductActions from "../state/product.actions";
import * as ProductSelectors from "../state/product.selectors";

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  private componentActive = true
  products: Product[]

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private store: Store
  ) { }


  ngOnInit(): void {
    this.store.dispatch(ProductActions.Load())
    this.store.select(ProductSelectors.selectAllProducts)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(prods => this.products = prods)

    // dispatch toastr according to the current operation stauts
    this.store.select(ProductSelectors.selectDeleteProductRequestStatus)
      .pipe(takeWhile(() => this.componentActive), skip(1))
      .subscribe(status => {
        switch (status) {
          case RequestStatus.succeeded:
            this.toastr.success(`product deleted successfully`)
            break;

          case RequestStatus.failed:
            this.toastr.error("Something went wrong")
            break;

          default:
            console.log(`unknown request status while handling delete operation. respoonse status is ${status}`);
            break;
        }
      }
      )
  }

  btnAdd() {
    console.log('items btn add');
    this.dialog.open(ProductFormDialogComponent, { width: '600px' })
  }

  btnEdit(id) {
    console.log('item edit btn ', id);
    this.dialog.open(ProductFormDialogComponent, { width: '600px', data: this.products.find((product) => product.id === id) })

  }

  btnDelete(id) {
    // TODO: use a confirm dialog
    console.log('item delete btn ', id);
    this.store.dispatch(ProductActions.DeleteProduct({ id }))
  }

  ngOnDestroy() {
    this.componentActive = false
  }

}
