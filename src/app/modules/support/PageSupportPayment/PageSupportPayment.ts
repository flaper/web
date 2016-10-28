import {Component} from '@angular/core';
import {UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {CostService} from "../../../services/payment/CostService";
import {Router} from "@angular/router";
import {PaymentService} from "../../../services/payment/PaymentService";

@Component({
  selector: 'page-support-payment',
  template: require('./PageSupportPayment.html'),
  styles: [require('./PageSupportPayment.scss')]
})
export class PageSupportPayment {
  amount = CostService.PREMIUM_SUPPORT;
  premiumSupport = null;

  constructor(private _user: UserService, _page: PageService, router: Router, private _payment: PaymentService) {
    if (!this._user.currentUser) {
      _page.navigateToLogin();
      return;
    }

    if (_user.currentUser.extra.hasPremiumSupport()) {
      router.navigateByUrl('/p/support/premium');
      return;
    }

    this.premiumSupport = this._user.currentUser.extra.premiumSupport;
  }

  pay() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let userId = this._user.currentUser.id;
    let data = {
      id: `premium_support_${year}_${month}_${userId}`,
      amount: this.amount,
      description: `Премиум Поддержка 30 дней`,
    };

    //noinspection TypeScriptValidateTypes
    this._payment.pay(data);
  }
}
