import { Routes } from '@angular/router';
import { ProductDetailsComponent } from 'app/product-details/product-details.component';
import { ProductsListComponent } from 'app/products-list/products-list.component';


export const MainLayoutRoutes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'products/:id', component: ProductDetailsComponent }
];
