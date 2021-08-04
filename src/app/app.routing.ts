import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes =[
  {
    path: '', 
    redirectTo: 'categories'},
  {
    path: 'categories',
    component: CategoriesListComponent
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'invoices/history',
    component: HistoryComponent
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent
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
