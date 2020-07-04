import { Component, OnInit } from '@angular/core';
import {PageClient} from "../../classes/page-client";
import {SupplierService} from "../../services/supplier.service";
import {Router} from "@angular/router";
import {Customer} from "../../customer";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];
  pageClient : PageClient ;
  selectedPage : number = 0;

  name: string;

  constructor(private supplierService: SupplierService, private router: Router) {
    this.name = 'Покупатели';
  }

  cl(){
    this.router.navigate(['/customers/' + 0 + '/edit']);
  }

  onSelect(page: number): void {
    console.log("selected page : "+page);
    this.selectedPage=page;
    this.supplierService.getPageClient1(page).subscribe(data => {
      this.pageClient = data;
    });
  }

  ngOnInit() {
    this.supplierService.getPageClient1(0).subscribe(data => {
      this.pageClient = data;
    });
  }

}
