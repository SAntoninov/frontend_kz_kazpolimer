import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supplier} from "../supplier";
import {PageClient} from "../classes/page-client";
import {Product} from "../classes/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private usersUrl: string;
  // private host = 'assistant.kazpolimer.kz';
  private host = 'localhost';
  private url = 'http://' + this.host + ':8080/products';

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://' + this.host + ':8080/qwe2';
  }

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.usersUrl);
  }

  postData(product: Product) {
    console.log("in service");
    console.log(product);
    return this.http.post(this.url, product);
  }

  getPageClient(page:number): Observable<PageClient>{
    let url = this.url;
    url = url + '?page=' + page + '&size=6';
    return this.http.get<PageClient>(url);
  }

  getSup(id: number): Observable<Product> {
    return this.http.get<Product>('http://' + this.host + ':8080/products/' + id);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

}
