import { Routes } from '@angular/router';
import { ProductDetailsComponent } from 'app/product-details/product-details.component';

import { HomeComponent } from '../../home/home.component';

export const MainLayoutRoutes: Routes = [
    { path: 'products', component: HomeComponent },
    { path: 'products/:id', component: ProductDetailsComponent }
];
