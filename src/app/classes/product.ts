import {Comment} from "../comment";
import {Contact} from "./contact";
import {Supplier} from "../supplier";
import {PhysicalProperties} from "./physical-properties";

export class Product {
  id: string;
  name: string;
  fullname: string;
  manufacturer: string;
  characteristicproperties: string;
  applicationarea: string;
  category: string;
  // supplier: Supplier;
  supplier: string;
  physicalProperties: Array<PhysicalProperties>;
  fil: Array<any>;
}
