import {Component} from '@angular/core';
import {AUTH_PROVIDERS, User, UserService, UserSettings} from "@flaper/angular";
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

  constructor(private userService:UserService, private userSettings:UserSettings) {
    this.user = PageUser.User;
    this.userService.getUserIdentitiesById(this.user.id).subscribe(identities => {
      this.identities = identities.map(row => {
        let provider = row['provider'];
        let map = _keyBy(AUTH_PROVIDERS, 'name');
        row['providerTitle'] = map[provider] ? map[provider]['publicUrlTitle'] : provider;
        row['icon'] = map[provider]['icon'];
        return row;
      });
    });
    if (this.userService.isCurrentUser(this.user)) {
      this.userSettings.getMy(UserSettings.SETTINGS.HIDE_SOCIAL_LINKS)
        .subscribe(value => this.hideSocialLinks = value)
    }
  }

  hideSocialChanged(event) {
    this.userSettings.setMy(UserSettings.SETTINGS.HIDE_SOCIAL_LINKS, event.target.checked);
  }
}
