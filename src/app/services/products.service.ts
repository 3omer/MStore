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
   
   getAll(category='', limit: number=10): Observable<Product[]> {
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

   getProduct(id:number | string){
    // fetch a sngile a product
    // https://fakestoreapi.com/products/1
    const url = `${this.URL}/${id}`
    return this.http.get<Product>(url).pipe(
      catchError(err => {
        console.log('getProduct:failed - error: ', err);
        this.notify.showNetworkFailerAlert()
        return null
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
