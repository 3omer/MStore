import { Component, OnInit } from '@angular/core';
import { Product } from 'app/common/product';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[]
  categories: string[]
  selectedCategory: string
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
     this.productsService.getProducts().subscribe(products => this.products=products)
     this.productsService.getCategories().subscribe(catgs => this.categories=catgs)
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
      this.productsService.getProducts(category).subscribe(filteredProducts => this.products = filteredProducts)
    }
  }
}
