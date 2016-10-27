import {Component} from '@angular/core';
import {User} from "@flaper/angular";
import {AccountService} from "@flaper/angular";
import {TRANSACTIONS_TYPES} from '@flaper/consts';
import {PageUser} from "../../PageUser/PageUser";

@Component({
  selector: 'page-user-stats',
  template: require('./UserStats.html')
})
export class UserStats {
  user:User;
  transactions = null;
  TYPES:any = TRANSACTIONS_TYPES;

  constructor(private _account:AccountService) {
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
      this._account.getTransactions(this.user.id).subscribe(data => {
        this.transactions = data;
      });
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
