import {Component} from '@angular/core';
import {User} from "@flaper/angular";
import {PageUser} from "../../pages/user/PageUser/PageUser";
import {AccountService} from "@flaper/angular";
import {TRANSACTIONS_TYPES} from '@flaper/consts';
import {UserLink} from "../UserLink/UserLink";

@Component({
  directives: [UserLink],
  selector: 'page-user-stats',
  template: require('./UserStats.html')
})
export class UserStats {
  user:User;
  transactions = null;
  TYPES:any = TRANSACTIONS_TYPES;

  constructor(private _account:AccountService) {
    this.user = PageUser.User;
    this._account.getTransactions(this.user.id).subscribe(data => {
      this.transactions = data;
    });
  }

  hint(type) {
    switch (type) {
      case  this.TYPES['BEST_STORY']:
            return 'За конкурс "Лучшая статья"';
      default:
            return '';
    }
  }
}
