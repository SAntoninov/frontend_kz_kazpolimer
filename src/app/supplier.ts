import {Comment} from './comment';
import {Contact} from './classes/contact';

export class Supplier {
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
  fil: Array<any>;
}
