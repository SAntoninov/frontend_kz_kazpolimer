import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../supplier";
import {PageClient} from "../../classes/page-client";
import {SupplierService} from "../../services/supplier.service";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  pageClient : PageClient ;
  selectedPage : number = 0;
  name: string;

  constructor(private productService: ProductService, private router: Router) {
    this.name = 'Товары';
  }

  cl(){
    this.router.navigate(['/products/' + 0 + '/edit']);
  }

  onSelect(page: number): void {
    console.log("selected page : "+page);
    this.selectedPage=page;
    this.productService.getPageClient(page).subscribe(data => {
      this.pageClient = data;
    });
  }

  ngOnInit() {
    this.productService.getPageClient(0).subscribe(data => {
      this.pageClient = data;
      console.log(this.pageClient);
      console.log(this.pageClient.content);
    });
  }

}
