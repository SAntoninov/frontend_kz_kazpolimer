import { Component, OnInit } from '@angular/core';
import {TestService} from '../../services/test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Supplier} from '../../supplier';
import {SupplierService} from "../../services/supplier.service";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  name: string;

  test: Supplier = new Supplier();

  receivedUser: Supplier; // полученный пользователь
  done: boolean = false;

  constructor(private testServiece: TestService, private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getSup();
  }

  deleteSupplier(supplier: Supplier){
    // TODO check err
    alert('удалено');
    this.supplierService.deleteSup(supplier).subscribe(hero => {this.test = hero}); // без субскрайба метод не отправляется!!!!!
    this.router.navigate(['/suppliers']);
  }

  edit() {
    this.router.navigate(['/suppliers/' + this.test.id + '/edit']);
  }

  getSup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // alert(id);
    this.testServiece.getSup(id)
      .subscribe(hero => {this.test = hero});
  }

  goToSuppliersList(){
    this.router.navigate(['/suppliers']);
  }

}
