import {Component} from '@angular/core';
import {RouteConfig, RouteParams} from '@angular/router-deprecated';
import {ACL, AccountService, User, UserService, UserSettings} from "@flaper/angular";
import {StoriesAutoList} from "../../story/StoriesAutoList/StoriesAutoList";
import {UserStories} from "../../user/UserStories/UserStories";
import {UserInfo} from "../../user/UserInfo/UserInfo";
import {UserStats} from "../../user/UserStats/UserStats";
import {Title} from "@angular/platform-browser"

@Component({
  selector: 'page-user',
  styles: [require('./PageUser.scss')],
  template: require('./PageUser.html')
})
@RouteConfig([
  {path: '/', name: 'UserStories', component: UserStories, useAsDefault: true},
  {path: '/info', name: 'UserInfo', component: UserInfo},
  {path: '/stats', name: 'UserStats', component: UserStats},
])
export class PageUser {
  static User:User; // to access from child routes
  user:User;
  amount:number = null;
  settings:Array<any> = null;

  constructor(routeParams:RouteParams, private _user:UserService, private _account:AccountService,
              private userSettings:UserSettings, private acl:ACL, ts:Title) {
    let id = routeParams.params['id'];
    //noinspection TypeScriptUnresolvedFunction
    this._user.getById(id).subscribe(user => {
      ts.setTitle(user.displayName);
      this.user = user;
      PageUser.User = user;
      this.updateAmount();
      this.userSettings.getByUserId(id)
        .subscribe(settings => {
          this.settings = settings
        })
    });
  }

  updateAmount() {
    if (this._user.currentUser) {
      this._account.getAmountById(this.user.id)
        .subscribe(amount => this.amount = amount);
    }
  }

  withdraw() {
    let amount = +prompt('Сколько баллов списать?');
    if (amount && amount > 0) {
      this._account.withdraw(this.user.id, amount).subscribe(() => this.updateAmount())
    }
  }

}
