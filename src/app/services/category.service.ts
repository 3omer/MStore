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
  }

  // post new category - returns new created category object OR null in case of failure
  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.BASE_URL, category)
  }

  // if successed returns the modified category
  update(targetId: number, modCategory: Category): Observable<Category> {
    const url = `${this.BASE_URL}/${targetId}`
    return this.http.put<Category>(url, modCategory)
  }


  delete(targetId: number): Observable<Boolean> {
    const url = `${this.BASE_URL}/${targetId}`
    return this.http.delete<Boolean>(url)
  }
}