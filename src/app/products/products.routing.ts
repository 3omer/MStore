import { Routes } from '@angular/router';
import { ProductDetailsComponent } from 'app/products/product-details/product-details.component';
import { ProductsListComponent } from 'app/products/products-list/products-list.component';


export const ProductsRoutes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'products/:id', component: ProductDetailsComponent }
];
