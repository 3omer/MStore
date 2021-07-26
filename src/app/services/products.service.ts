import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/common/product';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private URL = "https://fakestoreapi.com/products"
  constructor(private http: HttpClient, private notify: NotifyService) {

   }

   getProducts(limit: number=10): Observable<Product[]> {
     const url = `${this.URL}?limit=${limit}`
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
}
