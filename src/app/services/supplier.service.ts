import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplier} from '../supplier';
// import {PageClient} from '../classes/PageClient';
import {map} from 'rxjs/operators';
import {PageClient} from '../classes/page-client';
// import {Test} from "../classes/test";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private host = 'localhost';
  // private host = 'assistant.kazpolimer.kz';

  private usersUrl: string;
  private url = 'http://' + this.host + ':8080/supplier';
  private url1 = 'http://' + this.host + ':8080/customers';
  private url2 = 'http://' + this.host + ':8080/files/delete/';

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://' + this.host + ':8080/qwe2';
  }

  public findAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url + 's');
  }

  postData(supplier: Supplier) {
    // test.name = 'вввввввввввв';
    return this.http.post(this.url + 's', supplier);
  }

  deleteFile(filename: string){
    return this.http.get(this.url2 + filename);
  }

  getPageClient(page:number): Observable<PageClient>{
    let url = this.url;
    url = url + '?page=' + page + '&size=6';
    return this.http.get<PageClient>(url);
  }

  getPageClient1(page:number): Observable<PageClient>{
    let url = this.url1;
    url = url + '?page=' + page + '&size=6';
    return this.http.get<PageClient>(url);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  deleteSup(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>('http://' + this.host + ':8080/suppliers/delete', supplier);
  }
}
