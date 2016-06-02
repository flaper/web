import {Component} from '@angular/core';
import {RouteConfig, RouteParams} from '@angular/router-deprecated';
import {ACL, AccountService, User, UserService, UserSettings} from "flaper";
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
  {path: '/stats', name: 'UserStats', component: UserStats}
])
export class PageUser {
  static User:User; // to access from child routes
  user:User;
  amount:number = null;
  settings:Array<any> = null;

  constructor(routeParams:RouteParams, private userService:UserService, private accountService:AccountService,
              private userSettings:UserSettings, private acl:ACL, ts:Title) {
    let id = routeParams.params['id'];
    //noinspection TypeScriptUnresolvedFunction
    this.userService.getById(id).subscribe(user => {
      ts.setTitle(user.displayName);
      this.user = user;
      PageUser.User = user;
      if (this.userService.currentUser) {
        this.accountService.getAmountById(user.id)
          .subscribe(amount => this.amount = amount);
      }
      this.userSettings.getByUserId(id)
        .subscribe(settings => {
          this.settings = settings
        })
    });
  }
}
