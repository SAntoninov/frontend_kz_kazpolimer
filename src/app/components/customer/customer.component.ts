import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../supplier";
import {TestService} from "../../services/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../customer";
import {User} from '../../user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  comm: string;
  name: string;

  test: Customer = new Customer();
  comments = [{id: 50, time: 'asd', message: 'as', user: new User()}];

  receivedUser: Customer; // полученный пользователь
  done: boolean = false;

  constructor(private testServiece: TestService,
              private customerService: CustomerService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getSup();
  }

  submit(supplier: Supplier) {
  }

  edit() {
    this.router.navigate(['/customers/' + this.test.id + '/edit']);
  }

  getSup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getSCustomer(id)
      .subscribe(customer => {
        this.test = customer;
        this.comments.pop();
        for (let i of customer.comments){
          let c = {id: Number(i.id), time: i.time, message: i.message, user: i.user};
          this.comments.push(c);
        }
      });
  }

  te(){

  }

  sendComment(comm, customer){

    this.userService.getData(sessionStorage.getItem('username')).subscribe((data: User) => {
      this.comments.push({id: null, time: String((new Date()).valueOf()) , message: comm, user: data});
      console.log(data);
      customer.comments.push(new Comment());
      this.comm = '';

      for(let i = 0; i < customer.comments.length; i++){
        customer.comments[i].id = String(this.comments[i].id);
        customer.comments[i].time = this.comments[i].time;
        customer.comments[i].message = this.comments[i].message;
        customer.comments[i].user = this.comments[i].user; // возможно здесь придется копировать юзера целиком
      }
      this.customerService.postData(customer).subscribe(
        (data1: Customer) => {this.receivedUser = data1; this.done = true;alert('сохранено')},
        error1 => alert('error')
      );
    });

    // this.comments.push({id: null, time: String((new Date()).valueOf()) , message: comm, user: new User()});
    // // юзер нужен. чтоб получить сделать запрос, далее по никнецму,
    // // если никнеймы одинаковые то плохо, значит надло хранить в сессии стораге более уникальыне значения
    // // и с таймами разобраться

  }
}
