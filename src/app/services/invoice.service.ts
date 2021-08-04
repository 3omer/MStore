import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from 'app/common/Inovice';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private BASE_URL = "https://localhost:44381/api/invoices"

  constructor(private http: HttpClient) { }

  // all or empty if error
  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.BASE_URL)
    .pipe(catchError((error) => {
      console.log('getAllCategories failed: ', error)
      return of([] as Invoice[])
    }))
  }
  
  // returns Invoice if passed otherwise returns null 
  create(invoice: Invoice) {
    return this.http.post<Invoice>(this.BASE_URL, invoice)
    .pipe(
      catchError(error => {
        console.log("createInvoice failed: ", error)
        return of(null as Invoice)
      })
    )
  }

    // one or empty
    get(id: number): Observable<Invoice> {
      const url = `${this.BASE_URL}/${id}`
      return this.http.get<Invoice>(url)
      .pipe(
        catchError((error) => {
        console.log('getAllCategories failed: ', error)
        return of(null as Invoice)
      })
      )
    }

    update(targetId: number, modInvoice: Invoice) : Observable<Invoice> {
      const url = `${this.BASE_URL}/${targetId}`
      modInvoice.id = targetId
      return this.http.put<Invoice>(url, modInvoice)
      .pipe(
        map(res => modInvoice),
        catchError(error => {
          console.log('updat Invoice failed: ', error);
          return of(null as Invoice)
        })
      )
    }

}

