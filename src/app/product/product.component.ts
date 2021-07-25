import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/common/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  @Input() product: Product

}
