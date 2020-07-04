import {Component, ComponentFactory, ComponentFactoryResolver, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Supplier} from '../../supplier';
import {TestService} from '../../services/test.service';
import {SupplierService} from "../../services/supplier.service";
import {Contact} from "../../classes/contact";
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

  // private host = 'assistant.kazpolimer.kz';
  private host = 'localhost';
  contact: Contact = new Contact();

  // TODO вот здесь тонкое место с динамическим созданием объекта (почитать как это исправить)
  contacts = [{id: 50, name: 'asd', email: 'as', phone: 'a', position: 's', more: 's'}];
  receivedUser: Supplier; // полученный пользователь
  done: boolean = false;

  counter: number = 0;

  test: Supplier = new Supplier();

  idd: number = 63;

  constructor(private httpClient: HttpClient,
              private testServiece: TestService,
              private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }



  saverange(e){
    console.log(document.getElementById('Id' + (this.contacts.length - 1)));
  }

  goToSuppliersList(){
    this.router.navigate(['/suppliers']);
  }

  goToSupplier(){
    this.router.navigate(['/suppliers/' + this.test.id ]);
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
    // TODO здесь авторизация ломает закачку картинки
    var a = document.createElement("a");
    a.href = this.imgUrl + this.files[index];
    a.download = this.files[index];
    console.log(a.href);
    // // start download
    a.click();

    this.supplierService.getImage(this.imgUrl + this.files[index]).subscribe(
      (data: any) => {
        this.receivedUser = data;
        this.done = true;
      }
    );

  }

  submit(supplier: Supplier) {
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

    this.supplierService.postData(supplier).subscribe(
      (data: Supplier) => {this.receivedUser = data; this.done = true;alert('сохранено')},
      error1 => alert('error')
    );
  }

  filess(){
  }

  ngOnInit() {
    this.getSup();
  }

  getSup(): void {
    console.log(this.route.snapshot['_routerState'].url);
    const id = +this.route.snapshot.paramMap.get('id');
    if(id == 0){
      // TODO здесь добавление оформить. вставить поп и проверить как с pop-щм работает this.contacts.pop(); Этим
      this.test.contacts = [{id: '50', name: 'asd', email: 'as', phone: 'a', position: 's', more: 's'}];
      this.test.contacts.pop();
      this.contacts.pop();
      console.log(this.test.contacts);
    } else {

      this.testServiece.getSup(id).subscribe(hero => {
        this.test = hero;
        this.contacts.pop();
        for(let i of hero.contacts){
          let c = {id: Number(i.id), name: i.name, email: i.email, phone: i.phone, position: i.position, more: i.more};
          this.contacts.push(c);
        }

        console.log(hero.fil);
        for(let i of hero.fil){
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
      this.test.fil.push({id: Number.NaN, name: element.name, type: element.name.split('.')[1]});
      this.uploadFile1(event[index]);
    }
    console.log(event[0]);
    this.supplierService.postData(this.test).subscribe(
      (data: Supplier) => {this.receivedUser = data; this.done = true;}
    );

  }

  uploadFile1(file:File){
    let form = new FormData();
    form.append("file",file);
    let xhr = new XMLHttpRequest();
    xhr.open("POST",`http://`+this.host+`:8080/upload`);
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('token')); // хеадер надо ставить после open иначе не работает почемут
    xhr.send(form);
  }

  deleteAttachment(index) {
    (<HTMLInputElement>document.getElementById('idd')).value = '';
    let temp = this.files[index];
    console.log(temp);
    this.files.splice(index, 1);
    this.test.fil.splice(index, 1);
    this.supplierService.postData(this.test).subscribe(
      (data: Supplier) => {this.receivedUser = data; this.done = true;}
    );
  }


  deleteContactFromSuppliers(index) {
    this.contacts.splice(index, 1);
    this.test.contacts.splice(index, 1);
    this.supplierService.postData(this.test).subscribe(
      (data: Supplier) => {this.receivedUser = data; this.done = true;}
    );
  }

}
