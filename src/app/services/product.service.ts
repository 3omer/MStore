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
    .pipe(catchError((error) => {
      console.log('getAllProducts failed: ', error)
      return of([] as Product[])
    }))
  }

  // post new product - returns new created product object OR null in case of failure
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product)
    .pipe(
      catchError(error => {
        console.log("createproduct failed: ", error)
        return of(null as Product)
      })
    )
  }

  // if successed returns the modified product
  update(targetId: number, modproduct: Product): Observable<Product> {
    const url = `${this.BASE_URL}/${targetId}`

    return this.http.put<Product>(url, modproduct)
    .pipe(
      map(res => modproduct),
      catchError(error => {
        console.log('update product failed: ', error);
        return of(null as Product)
      })
    )
  }

  delete(targetId: number): Observable<Boolean> {
    const url = `${this.BASE_URL}/${targetId}`
    return this.http.delete<Boolean>(url)
    .pipe(
      map(res => true),
      catchError(error => {
        console.log("delete failed: ", error);
        return of(false)
      })
    )
  }
}