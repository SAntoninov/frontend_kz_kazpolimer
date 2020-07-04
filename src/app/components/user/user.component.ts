import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from "../../category";
import {MatDialog} from '@angular/material';
import {ApplicationAreas} from '../../application-areas';
import {UserCategoryModalComponent} from '../user-category-modal/user-category-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  date: Date;
  firstName: string;
  secondName: string;
  parent: string;

  use: User;

  categories: Array<Category>;
  category: Category;
  fullName: string;
  shortName: string;

  // TODO это исправить
  data: {name1: 'data', animal: 'data1'};

  add: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  changeEvent(event){
    console.log(event);
    this.date = event.value;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserCategoryModalComponent, {
      width: '850px',
      data: {name1: this.shortName, animal: this.fullName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      // this.category = {}; // TODO здесь ругается но работает почему-то
      this.category = new Category();
      this.category.id = '2';
      this.category.shortName = result.shortName;
      this.category.fullName = result.fullName;
      console.log(this.category);
      console.log(result);
      console.log('result');

      this.userService.addCategory(this.category).subscribe( (data: Category) => {
        alert('успешно добавлено');
        this.categories.push(data);
        console.log(this.categories);
      });
    });
  }

  ngOnInit(): void {

    if(Number(this.route.snapshot.paramMap.get('id')) === 0){
      this.add = true;
      this.use = new User();
      this.getCategories();
    } else{
      this.add = false;
      this.getUser();
      this.getCategories();
    }
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(hero => {
        console.log(hero);
        this.use = hero;
        this.firstName = this.use.fullName.split(' ')[1];
        this.secondName = this.use.fullName.split(' ')[0];
        this.parent = this.use.fullName.split(' ')[2];
      });
  }

  getCategories(): void {
    this.userService.getCategories().subscribe(result => this.categories = result);
  }

  setData(){
    this.use.fullName = this.secondName + ' ' + this.firstName + ' ' + this.parent;
  }

  deleteCategoresFromList(index){ // todo десь проверить. Ибо индекс это не id а рили индекс
    console.log(this.use);
    this.use.categories.splice(index,1);
  }

  addCategoryToList(index){

    let b = false;

    if(this.use.categories){
      for (let i = 0; i < this.use.categories.length; i++) {
        if(this.use.categories[i].shortName === this.categories[index].shortName){
          b = true;
        }
      }
    }

    if(b === false){
      if(this.use.categories === undefined){
        this.use.categories = new Array<Category>();
      }
      this.use.categories.push(this.categories[index]);
    } else {
      alert('категория существует');
    }
  }

  submit(){
    // собираем доупстимые категории
    this.setData();
    this.userService.postData(this.use).subscribe( (data: User) => {
      this.use = data;
      alert('успешно сохранено');
    });
  }

  close(){
    this.setData();
    this.userService.postData(this.use).subscribe( (data: User) => {
      this.use = data;
      alert('успешно сохранено');
      this.router.navigate(['/users']);
    });
  }

  // TODO добавление категорий
  addCategories(){
    this.openDialog();
  }

  deleteCategories(id, index){
    this.categories.splice(index, 1);
    this.userService.deleteCategory(id).subscribe( data => {
    });
  }

}
