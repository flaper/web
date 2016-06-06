import {Component} from '@angular/core';
import {UserService} from "@flaper/angular";
import {PageService} from "../../../../services/helpers/PageService";

@Component({
  selector: 'page-premium-support',
  template: require('./PagePremiumSupport.html'),
  styles: [require('./PagePremiumSupport.scss')],
})
export class PagePremiumSupport {
  constructor(private _user:UserService, _page:PageService) {
    if (!(_user.currentUser && _user.currentUser.extra.hasPremiumSupport() )) {
      _page.navigateToDefault();
    }
  }
}
