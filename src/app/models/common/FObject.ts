import {InitableModel} from "../core/InitableModel";
import {DOMAINS} from './Domain';

export class FObject extends InitableModel {
  id:string;
  title:string;
  slug:string;
  mainDomain:string;
  region:string;
  fields:Array<any>;
  flap: any;

  constructor({init: init = null}) {
    super({init});
  }

  isPlace() {
    return this.mainDomain === DOMAINS.PLACES;
  }

  getAddress() {
    let res = "";
    let address = this.fields['address'];
    if (address) {
      let parts = [address.street, address.houseNumber, address.extra];
      parts = parts.filter(value => value);
      res = parts.join(', ');
    }
    return res;
  }
}
