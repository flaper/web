import {Component} from '@angular/core';
import {User} from "flaper";
import {PageUser} from "../../pages/user/PageUser";
import {AccountService} from "flaper";
import {UserLink} from "../UserLink/UserLink";

@Component({
  directives: [UserLink],
  selector: 'page-user-stats',
  template: require('./UserStats.html')
})
export class UserStats {
  user:User;
  transactions = null;

  constructor(private _account:AccountService) {
    this.user = PageUser.User;
    this._account.getTransactions(this.user.id).subscribe(data => {
      this.transactions = data;
    });
  }
}
