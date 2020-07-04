import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Supplier} from "../supplier";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // private host = 'assistant.kazpolimer.kz';
  private host = 'localhost';

  private url = 'http://' + this.host + ':8080/customer';

  constructor(private http: HttpClient) { }

  getSCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>('http://' + this.host + ':8080/customers/' + id);
  }

  getSup(id: number): Observable<Customer> {
    return this.http.get<Customer>('http://' + this.host + ':8080/customers/' + id);
  }

  postData(customer: Customer) {
    return this.http.post(this.url + 's/', customer);
  }

}
