import { Component, OnInit } from '@angular/core';
// import {User} from '../../user';
import {UserService} from '../../services/user.service';
import {Router} from "@angular/router";
import {User} from '../../user';
import {ApplicationAreas} from '../../application-areas';
import {MatDialog} from '@angular/material';
import {ApplicationAreasDialogComponent} from '../application-areas-dialog/application-areas-dialog.component';
import {Supplier} from '../../supplier';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  values = [
    { id: 3432, name: "Recent" },
    { id: 3442, name: "Most Popular" },
    { id: 3352, name: "Rating" }
  ];

  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
    alert(newVal);
  }


  users: User[];
  categories: string[] = [];
  applicationAreas: ApplicationAreas[];
  applicationArea: ApplicationAreas;

  name: string;

  animal: string;
  name1: string;

  // ок лано, режим читерства, низя говорить так буим писать
  openDialog(): void {
    const dialogRef = this.dialog.open(ApplicationAreasDialogComponent, {
      width: '850px',
      data: {name1: this.name1, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // alert('closed');
      // this.animal = result;
      this.applicationArea = new ApplicationAreas('2', '2'); // TODO здесь ругается но работает почему-то
      this.applicationArea.id = '2';
      this.applicationArea.description = result;
      console.log(this.applicationArea);
      console.log(result);

      this.userService.addApplicationAreas(this.applicationArea).subscribe( (data: ApplicationAreas) => {
        alert('успешно добавлено');
        this.applicationAreas.push(data);
        console.log(this.applicationAreas);
      });
    });
  }


  // constructor() { }
  constructor(public dialog: MatDialog, private userService: UserService, private router: Router) {
    this.name = 'Администрирование';
  }

  add(){
    this.router.navigate(['/user/' + 0]);
    // this.router.navigate(['/use/' + null + '/edit']);
  }

  addAreas(){

    // this.router.navigate(['/use/' + null + '/edit']);
  }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
      this.users.forEach(r => {
        let res = '';
        if(r.categories !== undefined){
          for (let i = 0; i < r.categories.length; i++) {
            res += r.categories[i].shortName + ',';
          }
          res = res.substr(0, res.length - 1);
        }
        this.categories.push(res);
      });
    });

    this.userService.findAllApplicationAreas().subscribe(data => {
      this.applicationAreas = data;
    });
  }


  deleteApplicationArea(id, index){
    this.applicationAreas.splice(index, 1);
    this.userService.deleteApplicationArea(id).subscribe( data => {
    });
  }

}
