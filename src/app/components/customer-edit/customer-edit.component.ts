import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {Contact} from '../../classes/contact';
import {HttpClient} from '@angular/common/http';
import {SupplierService} from '../../services/supplier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../../customer';
import {CustomerService} from '../../services/customer.service';
import {CustomerProducts} from '../../classes/customer-products';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {


  contact: Contact = new Contact();

  // TODO это тоже исправить потом
  contacts = [{id: 50, name: 'asd', email: 'as', phone: 'a', position: 's', more: 's'}];
  products = [{id: 50, name: 'asd', valuebeg: 'as', valueend: 'a'}];

  receivedUser: Customer; // полученный пользователь
  done: boolean = false;

  counter: number = 0;

  test: Customer = new Customer();

  idd: number = 63;

  constructor(private httpClient: HttpClient,
              private customerServiece: CustomerService,
              private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }


  deleteProduct(index){
    this.products.splice(index, 1);
    this.test.customerProducts.splice(index, 1);
    this.customerServiece.postData(this.test).subscribe(
      (data: Customer) => {this.receivedUser = data; this.done = true;}
    );
  }

  addProduct(){
    this.products.push({id: null, name: '', valuebeg: '', valueend: ''});
    console.log('contacts');
    console.log(this.contacts);
    this.test.customerProducts.push(new CustomerProducts());
    console.log(this.contacts);
  }

  saverange(e){
    console.log(document.getElementById('Id' + (this.contacts.length - 1)));
  }

  goToSuppliersList(){
    this.router.navigate(['/customers']);
  }

  goToSupplier(){
    this.router.navigate(['/customers/' + this.test.id ]);
  }

  addContact(){
    this.contacts.push({id: null, name: '', email: '', phone: '', position: '', more: ''});
    console.log('contacts');
    console.log(this.contacts);
    this.test.contacts.push(new Contact());
    console.log(this.contacts);
  }

  imgUrl: string = 'http://localhost:8080/files/';
  download(index){
    // TODO кажется здесь авторизация ломает загрузку фала, переделать
    var a = document.createElement("a");
    a.href = this.imgUrl + this.files[index];
    a.download = this.files[index];
    console.log(a.href);
    // start download
    a.click();

    this.supplierService.getImage(this.imgUrl + this.files[index]).subscribe(
      (data: any) => {this.receivedUser = data; this.done = true;}
      // error1 => alert('error')
    );
  }

  submit(supplier: Customer) {
    console.log(supplier);
    console.log(supplier.contacts.length);
    console.log(this.contacts.length);
    for(let j =0; j < supplier.contacts.length; j++){
      supplier.contacts[j].id = String(this.contacts[j].id);
      supplier.contacts[j].name = this.contacts[j].name;
      supplier.contacts[j].phone = this.contacts[j].phone;
      supplier.contacts[j].email = this.contacts[j].email;
      supplier.contacts[j].position = this.contacts[j].position;
      supplier.contacts[j].more = this.contacts[j].more;
      console.log(this.contacts[j]);
      console.log(supplier.contacts[j]);
    }

    for(let k =0; k < supplier.customerProducts.length; k++){
      supplier.customerProducts[k].id = String(this.products[k].id);
      supplier.customerProducts[k].name = this.products[k].name;
      supplier.customerProducts[k].valuebeg = this.products[k].valuebeg;
      supplier.customerProducts[k].valueend = this.products[k].valueend;
    }

    // this.test.name = this.name;
    this.customerServiece.postData(supplier).subscribe(
      (data: Customer) => {this.receivedUser = data; this.done = true;alert('сохранено')},
      error1 => alert('error')
    );
  }

  filess(){

  }

  ngOnInit() {
    this.getSup();
    // this.textComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TextComponent);
  }

  getSup(): void {
    console.log(this.route.snapshot['_routerState'].url);

    const id = +this.route.snapshot.paramMap.get('id');

    if(id == 0){
      // TODO здесь добавление оформить. вставить поп и проверить как с pop-щм работает this.contacts.pop(); Этим
      this.test.contacts = [{id: '50', name: 'asd', email: 'as', phone: 'a', position: 's', more: 's'}];
      this.test.contacts.pop();
      this.contacts.pop();
      this.test.customerProducts = [{id: '50', name: 'asd', valuebeg: 'asd', valueend: 'asd'}];
      this.test.customerProducts.pop();
      this.products.pop();
      console.log(this.test.contacts);
    } else {

      this.customerServiece.getSup(id).subscribe(hero => {
        this.test = hero;

        this.contacts.pop();
        for(let i of hero.contacts){
          let c = {id: Number(i.id), name: i.name, email: i.email, phone: i.phone, position: i.position, more: i.more};
          this.contacts.push(c);
        }
        this.products.pop();
        for(let i of hero.customerProducts){
          let c = {id: Number(i.id), name: i.name, valuebeg: i.valuebeg, valueend: i.valueend};
          this.products.push(c);
        }

        console.log(hero.files);
        for(let i of hero.files){
          console.log(i);
          this.files.push(i.name);
        }

      });
    }
  }


  addInfo: string;

  files: any = [];

  uploadFile(event) {
    console.log('event length\n');
    console.log(event.length);
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      let temp = this.files[this.files.length - 1].id;
      let cc = temp;
      console.log('temp');
      console.log(temp);
      console.log(this.files.length);
      console.log(cc++);
      this.test.files.push({id: Number.NaN, name: element.name, type: 'dd'});
      this.uploadFile1(event[index]);
    }
    console.log(event[0]);

    this.customerServiece.postData(this.test).subscribe(
      (data: Customer) => {this.receivedUser = data; this.done = true;}
    );

  }

  uploadFile1(file:File){
    let form = new FormData();
    form.append("file",file);
    let xhr = new XMLHttpRequest();
    xhr.open("POST",`http://localhost:8080/upload`);
    xhr.send(form);
  }


  deleteAttachment(index) {
    (<HTMLInputElement>document.getElementById('idd')).value = '';
    let temp = this.files[index];
    console.log("yemp");
    console.log(temp);
    this.files.splice(index, 1);
    this.test.files.splice(index, 1);
    this.customerServiece.postData(this.test).subscribe(
      (data: Customer) => {this.receivedUser = data; this.done = true;}
    );
  }


  deleteContactFromSuppliers(index) {
    this.contacts.splice(index, 1);
    this.test.contacts.splice(index, 1);
    this.customerServiece.postData(this.test).subscribe(
      (data: Customer) => {this.receivedUser = data; this.done = true;}
    );
  }


}
