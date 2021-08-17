import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'app/common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = "https://localhost:44381/api/products"

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL)
  }

  // post new product - returns new created product object OR null in case of failure
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product)
  }

  // if successed returns the modified product
  update(targetId: number, modproduct: Product): Observable<Product> {
    const url = `${this.BASE_URL}/${targetId}`
    return this.http.put<Product>(url, modproduct)
  }

  delete(targetId: number): Observable<Boolean> {
    const url = `${this.BASE_URL}/${targetId}`
    return this.http.delete<Boolean>(url)
  }
}