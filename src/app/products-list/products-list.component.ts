import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'app/common/product';
import { ProductFormDialogComponent } from 'app/dialogs/product-form-dialog/product-form-dialog.component';
import { ProductService } from 'app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[]

  constructor( 
    public dialog: MatDialog,
    private productService: ProductService,
    private toastr: ToastrService
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
    this.dialog.open(ProductFormDialogComponent, { width: '600px' })
    .afterClosed()
    .subscribe(()=> {
      this.loadProducts()
    })
  }
  
  btnEdit(id) {
    console.log('item edit btn ', id);
    this.dialog.open(ProductFormDialogComponent, { width: '600px', data: this.products.find((product) => product.id === id) })
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
        this.toastr.success("Product has been deleted")
        this.products = this.products.filter(cat => cat.id != id)
      }
      else {
        this.toastr.error("Something went wrong")        
      }
    })
    
  }

}
