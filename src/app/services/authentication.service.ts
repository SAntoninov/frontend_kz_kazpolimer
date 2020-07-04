import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {JwtRequest} from "../classes/jwt-request";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  test = new EventEmitter<boolean>();

  constructor(private router: Router, private httpClient: HttpClient) { }

  // post методом закинуть пароль и юзера на authenticate получить токен и сохранить в сессион стораже если фолс то тинт
  // в интерсепторе вставляем токен из стоража. Логаут - чистим стораж.
  // регистрация, пока что просто сохраняем в списке бд очередного пользователя
  authenticate(username, password){

    return this.httpClient.post<any>('http://localhost:8080/api/authenticate', new JwtRequest(username, password)).toPromise().then(
      userData => {
        console.log('token');
        console.log(userData);
        sessionStorage.setItem('username', username);
        let tokenStr = 'Bearer ' + userData.token;
        sessionStorage.setItem('token', tokenStr);
        return true;
      },
      error1 => {
        console.log(error1);
        console.log('errrr');
        alert('Неправильные логин или пароль');
        this.logOut(); // это на случай если сессия на сервере обрывается, чтобы чистило клиент.
        return false;
      }
    );
  }


  isUserLoggedIn(){
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
