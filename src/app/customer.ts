import {Comment} from "./comment";
import {Contact} from "./classes/contact";
import {CustomerProducts} from "./classes/customer-products";

export class Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  addressactual: string;
  addresslegal: string;
  lastinfo: string;
  additionalinfo: string;
  date: string;
  comments: Array<Comment>;
  contacts: Array<Contact>;
  customerProducts: Array<CustomerProducts>;
  files: Array<any>;
}
