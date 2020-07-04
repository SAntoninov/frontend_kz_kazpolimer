import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;

  t(param: boolean){
    this.authService.test.emit(param);
  }

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  logOut(){
    this.t(false);
    this.authService.logOut();
  }

}
