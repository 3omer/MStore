import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from 'app/common/category';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BASE_URL = "https://localhost:44381/api/categories"

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL)
    .pipe(catchError((error) => {
      console.log('getAllCategories failed: ', error)
      return of([] as Category[])
    }))
  }

  // post new category - returns new created category object OR null in case of failure
  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.BASE_URL, category)
    .pipe(
      catchError(error => {
        console.log("createCategory failed: ", error)
        return of(null as Category)
      })
    )
  }

  // if successed returns the modified category
  update(targetId: number, modCategory: Category): Observable<Category> {
    const url = `${this.BASE_URL}/${targetId}`

    return this.http.put<Category>(url, modCategory)
    .pipe(
      map(res => modCategory),
      catchError(error => {
        console.log('updat category faied: ', error);
        return of(null as Category)
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