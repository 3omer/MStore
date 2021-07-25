import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/common/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private URL = "https://fakestoreapi.com/products"
  constructor(private http: HttpClient) {

   }

   getProducts(limit: number=10): Observable<Product[]> {
     const url = `${this.URL}?limit=${limit}`
     return this.http.get<Product[]>(url)
   }
}
