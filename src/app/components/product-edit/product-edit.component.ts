import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../services/supplier.service";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../classes/product";
import {Contact} from "../../classes/contact";
import {PhysicalProperties} from "../../classes/physical-properties";
import {Supplier} from "../../supplier";
import {Category} from '../../category';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  physicalProperties = [{id: 50, name: 'asd', props: []}];

  products: Product = new Product();
  files: any = [];

  // private host = 'assistant.kazpolimer.kz';
  private host = 'localhost';

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private suppliersService: SupplierService,
              private userService: UserService) { }



  suppliers: Array<Supplier>;
  categories: Array<Category>;
  fl: boolean;

  ngOnInit() {
    this.getProd();
    this.suppliersService.findAll().subscribe(data => {
      this.suppliers = data;
    });
    this.userService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onChange(event): void {
    const test = event.target.value;
    console.log(event);
    this.products.supplier = event.target.value;
    // this.products.supplier = test;
    // this.products.supplier // тут подумать либо тупо оставить имя в модели либо полностью суппалера. Но второе непонятно зачем
  }

  onChangeCategory(event): void {
    this.products.category = event.target.value;
  }

  getProd(): void {
    console.log(this.route.snapshot['_routerState'].url);
    const id = +this.route.snapshot.paramMap.get('id');
    if(id == 0){
      this.fl = true;
      this.products.physicalProperties = [{id: '50', name: 'asd', props: []}];
      // this.products.physicalProperties = this.physicalProperties;
      this.products.physicalProperties.pop();
      this.physicalProperties.pop();
    } else{
      this.productService.getSup(id).subscribe(products => {
        this.products = products;
        this.physicalProperties.pop();
        for(let i of products.physicalProperties){
          let c = {id: Number(i.id), name: i.name, props: i.props};
          this.physicalProperties.push(c);
        }
        console.log(products.fil);
        for(let i of products.fil){
          console.log(i);
          this.files.push(i.name);
        }
      });
    }
  }

  idd: number = 500;
  idd2: number = 500;

  addPhysicalProperty(){
    let temp = {id: null, name: '', props: [{id: null, name: ' ', valuedoc: ' ', valuefact: ' '}]};
    this.physicalProperties.push({id: null, name: '', props: [{id: null, name: ' ', valuedoc: ' ', valuefact: ' '}]});
    this.products.physicalProperties.push(temp);
  }

  addProp(index){
    console.log("addprop");
    console.log(index);
    // let temp = {id: this.idd++, name: '', props: [{id:this.idd2++, name: ' ', valuedoc: ' ', valuefact: ' '}]};
    // this.physicalProperties.push({id: this.idd++, name: '', props: [{id:this.idd2++, name: ' ', valuedoc: ' ', valuefact: ' '}]});
    // console.log('physicalProperties');
    // console.log(this.physicalProperties);
    // // this.products.physicalProperties.push(new PhysicalProperties());
    // this.products.physicalProperties.push(temp);
    let temp = String(this.idd2++);
    this.physicalProperties[index].props.push({id: null, name: ' ', valuedoc: ' ', valuefact: ' '});
    // this.products.physicalProperties[index].props.push({id: temp, name: ' ', valuedoc: ' ', valuefact: ' '});
  }

  deletePhysicalProps(index) {
    this.physicalProperties.splice(index, 1);
    this.products.physicalProperties.splice(index, 1);
    this.productService.postData(this.products).subscribe(
      (data: Supplier) => {},
      error1 => alert('error')
    );
  }

  deleteProp(index, index2) {
    this.physicalProperties[index].props.splice(index2, 1);
    // this.products.physicalProperties[index].props.splice(index2, 1);
    this.productService.postData(this.products).subscribe(
      (data: Supplier) => {},
      error1 => alert('error')
    );
  }

  submit(product: Product) {
    console.log(product);
    console.log(product.physicalProperties.length);
    console.log(this.physicalProperties.length);
    for(let j =0; j < product.physicalProperties.length; j++){
      product.physicalProperties[j].id = String(this.physicalProperties[j].id);
      product.physicalProperties[j].name = this.physicalProperties[j].name;
      for (let jj = 0; jj < product.physicalProperties[j].props.length; jj++){
        product.physicalProperties[j].props[jj].id = String(this.physicalProperties[j].props[jj].id);
        product.physicalProperties[j].props[jj].name = this.physicalProperties[j].props[jj].name;
        product.physicalProperties[j].props[jj].valuefact = this.physicalProperties[j].props[jj].valuefact;
        product.physicalProperties[j].props[jj].valuedoc = this.physicalProperties[j].props[jj].valuedoc;
      }
      // product.physicalProperties[j].props = this.physicalProperties[j].props;
      console.log("local props");
      console.log(this.physicalProperties[j]);
      console.log("result props");
      console.log(product.physicalProperties[j]);
    }

    // this.test.name = this.name;
    this.productService.postData(product).subscribe(
      (data: Product) => {},
      error1 => alert('error')
    );
  }




  uploadFile(event) {
    console.log('event length\n');
    console.log(event.length);
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      this.products.fil.push({id: Number.NaN, name: element.name, type: element.name.split('.')[1]});
      this.uploadFile1(event[index]);
    }

    this.productService.postData(this.products).subscribe(
      (data: Supplier) => {}
      // error1 => alert('error')
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
    console.log("yemp");
    console.log(temp);
    this.files.splice(index, 1);
    this.products.fil.splice(index, 1);
    this.productService.postData(this.products).subscribe(
      (data: Supplier) => {}
    );
  }



  download(index){

  }




}
