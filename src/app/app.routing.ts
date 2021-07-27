import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  }, {
    path: '',
    component: ProductsComponent,
    children: [{
      path: '',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
