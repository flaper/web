import {Component} from '@angular/core';
import {UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {CostService} from "../../../services/payment/CostService";

@Component({
  selector: 'page-support-payment',
  template: require('./PageSupportPayment.html'),
})
export class PageSupportPayment {
  amount = CostService.PREMIUM_SUPPORT;

  constructor(private _user: UserService, _page: PageService) {
    if (!(_user.currentUser && _user.currentUser.extra.hasPremiumSupport() )) {
      // _page.navigateToDefault();
    }
  }

  pay() {
  }
}
