import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Test} from '../classes/test';
import {Supplier} from '../supplier';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private url: string;
  // private host = 'assistant.kazpolimer.kz';
  private host = 'localhost';

  constructor(private http: HttpClient) {
    this.url = 'http://' + this.host + ':8080/test';
  }

  public findAll(): Observable<Test[]> {
    return this.http.get<Test[]>(this.url);
  }

  postData(test: Test) {
    return this.http.post(this.url + '1', test);
  }

  getSup(id: number): Observable<Supplier> {
    return this.http.get<Supplier>('http://' + this.host + ':8080/suppliers/' + id);
  }

}
