import { Component, OnInit } from '@angular/core';
import { Product } from 'app/common/product';
import { ProductsService } from 'app/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

//TODO: move spinner calls to products-service 

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[]
  categories: string[]
  selectedCategory: string = 'all'
  constructor(private productsService: ProductsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // fetch categories
    this.productsService.getCategories().subscribe(catgs => this.categories=catgs)
    // load default category 'all'
    this.onCategorySelected('all')
    }

  onCategorySelected(category: string) {
    // load products of specific category
    console.log("onCategorySelected: ", category);
    
    if (!category) {
      // invalid call do not filter
      return this.products
    }
    else {
      this.selectedCategory = category
      this.spinner.show()
      this.productsService.getAll(category).subscribe(filteredProducts => {
        this.products = filteredProducts
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      })
    }
  }
}
