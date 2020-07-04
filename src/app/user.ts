import {Category} from "./category";

export class User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  categories: Array<Category>;
  password: string;
}
