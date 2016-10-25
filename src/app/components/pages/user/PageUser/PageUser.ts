import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ACL, AccountService, User, UserService, UserSettings} from "@flaper/angular";
import {Title} from "@angular/platform-browser"
import {ReplaySubject} from 'rxjs';
import {SubscribeButton} from "../../../subscription/SubscribeButton/SubscribeButton";

@Component({
  selector: 'page-user',
  entryComponents: [SubscribeButton],
  styles: [require('./PageUser.scss')],
  template: require('./PageUser.html')
})
export class PageUser {
  static User:User; // to access from child routes
  static UserObservable:ReplaySubject<User>; // to access from child routes
  user:User;
  amount:number = null;
  settings:any = null;

  constructor(route:ActivatedRoute, private _user:UserService, private _account:AccountService,
              private userSettings:UserSettings, private acl:ACL, ts:Title) {
    PageUser.UserObservable = new ReplaySubject<User>(1);
    route.params.subscribe(params => {
      let id = params['id'];
      //noinspection TypeScriptUnresolvedFunction
      this._user.getById(id).subscribe(user => {
        ts.setTitle(user.displayName);
        this.user = user;
        PageUser.User = user;
        PageUser.UserObservable.next(user);
        this.updateAmount();
        this.userSettings.getByUserId(id)
          .subscribe(settings => {
            this.settings = settings
          })
      });
    })
  }
  isPointsVisible() {
    let rule1 = this.amount !== null,
        isAdmin = this._user.currentUser.roles.indexOf('super') != -1,
        rule2 = this.settings ? this.settings.HIDE_POINTS ? this._user.isCurrentUser(this.user) || isAdmin : true : false;
    return rule1 && rule2;
  }
  updateAmount() {
    if (this._user.currentUser) {
      this._account.getAmountById(this.user.id)
        .subscribe(amount => this.amount = amount);
    }
  }
  isHidden() {
    if (!this._user.currentUser) return true;
    return this._user.currentUser.id === this.user.id;
  }
  withdraw() {
    let amount = +prompt('Сколько баллов списать?');
    if (amount && amount > 0) {
      this._account.withdraw(this.user.id, amount).subscribe(() => this.updateAmount())
    }
  }

}
