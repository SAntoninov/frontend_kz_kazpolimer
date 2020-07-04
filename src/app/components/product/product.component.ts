import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Supplier} from "../../supplier";
import {TestService} from "../../services/test.service";
import {SupplierService} from "../../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../classes/product";
import * as $ from 'jquery';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  ev: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  // private host = 'assistant.kazpolimer.kz';
  private host = 'localhost';
  index: number = 0;
  map: any = [{id: 1, name: ''}];
  photoUrls: string[] = ['http://localhost:8080/files/378_v1 (1).png'];
  imgUrl: string = 'http://localhost:8080/files/378_v1 (1).png';
  name: string;

  url: string = 'http://'+this.host+':8080/files/';

  test: Product = new Product();

  receivedUser: Supplier; // полученный пользователь
  done: boolean = false;

  constructor(private elementRef: ElementRef,
              private testServiece: TestService,
              private supplierService: SupplierService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }


  names: any = [];

  ngOnInit() {
    this.getSup().then( s => {
      console.log('in promise');
      console.log(this.test.fil);
      this.test.fil.forEach( d => {
        console.log(d);
        console.log(d.type);
        if(d.type == 'jpg' || d.type == 'JPG' || d.type == 'png' || d.type == 'PNG'){
          this.names.push(d.name);
        }
      });
      console.log(this.names);
      this.index = 0;
      this.getImageFromService(0);
    });
  }

  submit(supplier: Supplier) {
    this.supplierService.postData(supplier).subscribe(
      (data: Supplier) => {this.receivedUser = data; this.done = true;},
      error1 => alert('error')
    );
  }

  edit() {
    this.router.navigate(['/products/' + this.test.id + '/edit']);
  }

  getSup(){
    const id = +this.route.snapshot.paramMap.get('id');
    return this.productService.getSup(id)
      .toPromise().then(hero => {this.test = hero});
  }



  imageToShow: any;
  isImageLoading: boolean;
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }



  }

  getImageFromService(index: number) {
    this.isImageLoading = true; // флаг поцесса загрузки
    console.log(this.names[index]);
    console.log(this.names);
    console.log(index);
      this.productService.getImage(this.url + this.names[index]).subscribe(data => {

        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });

  }

  getImageFromService1() {
    this.isImageLoading = true;
    this.productService.getImage(this.imgUrl).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  ngAfterViewInit() {

    $(this.elementRef.nativeElement).find('.arrow-container .prev').on('click', () => {
      if(this.index !== 0){
        this.index--;
      }
      this.getImageFromService(this.index);
    });

    $(this.elementRef.nativeElement).find('.arrow-container .next').on('click', () => {
      if(this.index < this.names.length - 1){
        this.index++;
      }
      this.getImageFromService(this.index);
    });

    $(this.elementRef.nativeElement).find('#left').on('click', () => {
      if(this.index !== 0){
        this.index--;
      }
      this.getImageFromService(this.index);
    });

    $(this.elementRef.nativeElement).find('#right').on('click', () => {
      if(this.index < this.names.length - 1){
        this.index++;
      }
      this.getImageFromService(this.index);
    });

  }
  // https://stackblitz.com/edit/angular-1yr75s?file=src%2Fapp%2Fapp.component.css

  fileChangeEvent(event: any): void {
    alert('filechanged');
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    alert('imagecroped');
    console.log(event);
    this.croppedImage = event.base64;
    this.ev = event.file;
    let form = new FormData();
    form.append("imageValue", this.croppedImage);
    let xhr = new XMLHttpRequest();
    xhr.open("POST",`http://`+this.host+`:8080/uploadImage2/` + sessionStorage.getItem('username'));
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('token')); // хеадер надо ставить после open иначе не работает почемут
    xhr.send(form);
    alert('success');
  }

  imageLoaded() {
    // show cropper
  }

  f: File;

  cropperReady() {
    alert('cropedready');
    let form = new FormData();
    this.f = new File([this.croppedImage], 'qweqwewqe.png');
    form.append("file", this.f);
    let xhr = new XMLHttpRequest();
    xhr.open("POST",`http://`+this.host+`:8080/upload`);
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('token')); // хеадер надо ставить после open иначе не работает почемут
    xhr.send(form);
    alert('cropedreadyfin');
  }

  loadImageFailed() {
    // show message
  }




}
