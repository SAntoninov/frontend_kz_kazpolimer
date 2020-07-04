import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user';
import {Category} from "../category";
import {ApplicationAreas} from '../application-areas';

@Injectable({providedIn: 'root'})
export class UserService {

  private usersUrl: string;
  // private urlName = 'assistant.kazpolimer.kz'; // TODO build for prod
  private urlName = 'localhost';
  private url = 'http://' + this.urlName + ':8080/users';

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://' + this.urlName + ':8080/api/user';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public findAllApplicationAreas(): Observable<ApplicationAreas[]> {
    return this.http.get<ApplicationAreas[]>('http://' + this.urlName + ':8080/applicationAreas');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>('http://' + this.urlName + ':8080/user_category/' + id);
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('http://' + this.urlName + ':8080/categories');
  }

  postData(user: User) {
    return this.http.post(this.url, user);
  }

  addApplicationAreas(applicationAreas: ApplicationAreas) {
    return this.http.post('http://' + this.urlName + ':8080/applicationAreasAdd', applicationAreas);
  }

  deleteApplicationArea(id: number) {
    return this.http.get('http://' + this.urlName + ':8080/applicationAreasDelete/' + id);
  }

  addCategory(category: Category) {
    return this.http.post('http://' + this.urlName + ':8080/addCategory', category);
  }

  deleteCategory(id: number) {
    return this.http.get('http://' + this.urlName + ':8080/categoriesDelete/' + id);
  }

  getData(username: string){
    return this.http.get('http://' + this.urlName + ':8080/user_category1/' + username);
  }
}
