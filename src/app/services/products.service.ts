import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/common/product';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private URL = "https://fakestoreapi.com/products"
  constructor(private http: HttpClient, private notify: NotifyService) {

   }

   getProducts(category='', limit: number=10): Observable<Product[]> {
     const url = category.length ? `${this.URL}/category/${category}?limit=${limit}` : `${this.URL}?limit=${limit}` 
     return this.http.get<Product[]>(url)
     .pipe(
       catchError((err) => {
          console.log('getProducts:failed - error: ', err)
           // show an alerts
           this.notify.showNetworkFailerAlert()
          return []
       })
     )

   }

   getCategories(): Observable<string[]> {
    //  TODO: fetch from https://fakestoreapi.com/products/categories
     return of([
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing"
  ])
   }
}
