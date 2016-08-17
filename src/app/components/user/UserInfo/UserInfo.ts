import {Component} from '@angular/core';
import {AUTH_PROVIDERS, User, UserService, UserSettings, ACL, ObjectService} from "@flaper/angular";
import {PageUser} from "../../pages/user/PageUser/PageUser";
let _keyBy = require('lodash/keyBy');

class IdentityProvider {
  provider:string;
  providerTitle:string;
  url:string;
  displayName:string
}

@Component({
  selector: 'page-user-info',
  styles: [require('./UserInfo.scss')],
  template: require('./UserInfo.html')
})
export class UserInfo {
  user:User;
  identities:Array<IdentityProvider> = null;
  hideSocialLinks = null;

  constructor(private _user:UserService, private userSettings:UserSettings, private acl:ACL,
              private _object:ObjectService) {
    PageUser.UserObservable.subscribe(user=> {
      if (this.user && this.user.id == user.id) {
        return;
      }
      this.user = user;
      if (this.acl.isSuper()) {
        this._user.requestUserExtra(user.id);
      }
      this._user.getUserIdentitiesById(this.user.id).subscribe(identities => {
        this.identities = identities.map(row => {
          let provider = row['provider'];
          let map = _keyBy(AUTH_PROVIDERS, 'name');
          row['providerTitle'] = map[provider] ? map[provider]['publicUrlTitle'] : provider;
          row['icon'] = map[provider]['icon'];
          return row;
        });
      });
      if (this._user.isCurrentUser(this.user)) {
        this.userSettings.getMy(UserSettings.SETTINGS.HIDE_SOCIAL_LINKS)
          .subscribe(value => this.hideSocialLinks = value)
      }
    })
  }

  hideSocialChanged(event) {
    this.userSettings.setMy(UserSettings.SETTINGS.HIDE_SOCIAL_LINKS, event.target.checked);
  }
}
