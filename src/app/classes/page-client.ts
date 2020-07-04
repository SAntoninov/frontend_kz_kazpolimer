
import { OnInit } from '@angular/core';
import {Supplier} from '../supplier';

export class PageClient {
  content : any[];
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;

}
