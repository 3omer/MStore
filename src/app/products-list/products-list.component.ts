import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'app/common/product';
import { ProductFormDialogComponent } from 'app/dialogs/product-form-dialog/product-form-dialog.component';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[]

  constructor( 
    public dialog: MatDialog,
    private productService: ProductService
    ) { }
  ngOnInit(): void {
    this.productService.getAll()
    .subscribe(res => {
      this.products = res
    })
  }

  loadProducts() {
    this.productService.getAll()
    .subscribe(res => {
      this.products = res
    })
  }

  btnAdd() {
    console.log('items btn add');
    this.dialog.open(ProductFormDialogComponent, { width: '500px' })
    .afterClosed()
    .subscribe(()=> {
      this.loadProducts()
    })
  }
  
  btnEdit(id) {
    console.log('item edit btn ', id);
    this.dialog.open(ProductFormDialogComponent, { width: '500px', data: this.products.find((product) => product.id === id) })
    .afterClosed()
    .subscribe(()=> {
      this.loadProducts()
    })
  }

  btnDelete(id) {
    // TODO: use a confirm dialog
    console.log('item delete btn ', id);
    this.productService.delete(id).subscribe(flag => {
      if(flag) { 
        console.log("operation passed");
        this.products = this.products.filter(cat => cat.id != id)
      }
      else console.log("operation failed");
    })
    
  }

}
