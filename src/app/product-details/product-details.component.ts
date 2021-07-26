import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/common/product';
import { ProductsService } from 'app/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product
  constructor(private productsService: ProductsService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.spinner.show()
    this.productsService.getProduct(id).subscribe(product => {
      this.product = product
      this.spinner.hide()
    })
  }

}
