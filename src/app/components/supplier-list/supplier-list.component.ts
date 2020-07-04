import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../../services/supplier.service';
import {Supplier} from '../../supplier';
import {PageClient} from '../../classes/page-client';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  providers: [SupplierService]
})
export class SupplierListComponent implements OnInit {

  suppliers: Supplier[];
  pageClient : PageClient ;
  selectedPage : number = 0;

  name: string;

  constructor(private supplierService: SupplierService, private router: Router) {
    this.name = 'Поставщики';
  }

  cl(){
    this.router.navigate(['/suppliers/' + 0 + '/edit']);
  }

  onSelect(page: number): void {
    console.log("selected page : "+page);
    this.selectedPage=page;
    this.supplierService.getPageClient(page).subscribe(data => {
      this.pageClient = data;
    });
  }

  ngOnInit() {
    this.supplierService.getPageClient(0).subscribe(data => {
      this.pageClient = data;
    });
  }

}
