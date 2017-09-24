import {Injectable} from '@angular/core';
import {UserService} from "@flaper/angular";
import {Config} from '../../config/Config';

const SHOP_ID = Config.ym.shopId;
const SCID = Config.ym.scid;
@Injectable()
export class PaymentService {

  constructor(private _user: UserService) {
  }

  pay({id, amount, description, email, phone, customerName}:
    {id: any, amount: any, description?: string, email?: string, phone?: string, customerName?: string}) {
    let data = {
      sum: amount,
      orderNumber: id,
      custName: customerName,
      cps_email: email,
      cps_phone: phone,
      orderDetails: description
    };
    this.payViaYandex(data);
  }

  payViaYandex(data) {
    data.shopId = SHOP_ID;
    data.scid = SCID;
    data.customerNumber = this._user.currentUserId;
    let params = [];
    for (let param in data) {
      if (!data.hasOwnProperty(param) || !data[param]) continue;
      let value = encodeURIComponent(data[param]);
      params.push(`${param}=${value}`);
    }
    let url = 'https://money.yandex.ru/eshop.xml?';
    url += params.join('&');
    location.href = url;
  }
}

export let PAYMENT_SERVICE_PROVIDER = [PaymentService];
