import {Component} from '@angular/core';
import {FObject} from "@flaper/angular";
import {LayoutObject} from "../LayoutObject/LayoutObject";
import {CostService} from "../../../../services/payment/CostService";
import {PaymentService} from "../../../../services/payment/PaymentService";

@Component({
  selector: 'page-search-engine-hide',
  template: require('./PageSearchEngineHide.html'),
  styles: [require('./PageSearchEngineHide.scss')]
})
export class PageSearchEngineHide {
  prices = CostService.NO_INDEX;
  selected = CostService.NO_INDEX[0];
  obj: FObject;

  constructor(private _payment: PaymentService) {
    LayoutObject.ObjectObservable.subscribe(obj=> {
      this.obj = obj;
    });
  }

  pay() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let length = this.selected.name;
    let data = {
      id: `noindex_${year}_${month}_${this.obj.id}_${length}`,
      amount: this.selected.amount,
      description: `Закрытие от индексирования на ${this.selected.description}`,
    };

    //noinspection TypeScriptValidateTypes
    this._payment.pay(data);
  }
}
