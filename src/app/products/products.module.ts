import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutes } from './products.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ProductsListComponent } from 'app/products/products-list/products-list.component';
import { ProductComponent } from 'app/products/product/product.component';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { ProductDetailsComponent } from 'app/products/product-details/product-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ProductsService } from 'app/services/products.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxSpinnerModule
  ],
  declarations: [
    ProductsListComponent,
    ProductComponent,
    CategoriesListComponent,
    ProductDetailsComponent
  ],
  providers: [ProductsService]
})

export class ProductsModule {}
