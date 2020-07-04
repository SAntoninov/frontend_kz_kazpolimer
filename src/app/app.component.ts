import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean = false;
  title = 'Администрирование';

  constructor(private router: Router, private loginService: AuthenticationService){}

  ngOnInit(): void {
    this.loginService.test.subscribe((data) => {
      this.loggedIn = data;
    });
    console.log(sessionStorage.getItem('username'));

    if(sessionStorage.getItem('username')){
      this.loggedIn = true;
    }
    else{
      this.router.navigate(['login']);
    }
  }


}
