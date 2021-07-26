import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainLayoutRoutes } from './main-layout.routing';
import { HomeComponent } from '../../home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ProductsListComponent } from 'app/products-list/products-list.component';
import { ProductComponent } from 'app/product/product.component';
import { CategoriesListComponent } from '../../categories-list/categories-list.component';
// 3d party module
import { NgxSpinnerModule } from "ngx-spinner";
import { ProductDetailsComponent } from 'app/product-details/product-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  // 3d party module
    NgxSpinnerModule
  ],
  declarations: [
    HomeComponent,
    ProductsListComponent,
    ProductComponent,
    CategoriesListComponent,
    ProductDetailsComponent
  ]
})

export class MainLayoutModule {}
