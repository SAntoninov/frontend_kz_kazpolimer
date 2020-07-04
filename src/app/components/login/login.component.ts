import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  t(param: boolean){
    this.loginService.test.emit(param);
  }

  constructor(
    private loginService: AuthenticationService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() { // посмотреть как блокировать маршрут ибо можно через браузер войти в него
    sessionStorage.setItem('token', ''); // не вводить логаут плиииииз))) и да, занулить здесь токен мало, надо еще и на сервере
  }

  login() {
    let url = 'http://localhost:8080/user';
    let result = this.http.post<Observable<boolean>>(url, {
      userName: this.model.username,
      password: this.model.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.username + ':' + this.model.password)
        );
        this.router.navigate(['']);
        alert("Authentication failedssss.");
      } else {
        alert("Authentication failed.");
      }
    });
  }

  username: string = '';
  password: string = '';
  invalidLogin: boolean = false;


  checkLogin(){
    this.loginService.authenticate(this.model.username, this.model.password).then((success) => {
      this.router.navigate(['users']);
      this.t(true);
    }). catch(
      (err) => {
        this.router.navigate(['login']);
      }
    );
  }
}
