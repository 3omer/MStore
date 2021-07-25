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

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
     this.productsService.getProducts().subscribe(products => this.products=products)
  }
}
