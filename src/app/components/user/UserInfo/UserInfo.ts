import {Component} from 'angular2/core';
import {User} from "../../../models/common/User";
import {PageUser} from "../../pages/user/PageUser";
import {UserService} from "../../../services/UserService";
import {PROVIDERS} from "../../../services/AuthService";
import * as _ from 'lodash';
import {UserSettings} from "../../../services/UserSettings";

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
        let map = _.keyBy('name', PROVIDERS);
        row['providerTitle'] = map[provider] ? map[provider]['publicUrlTitle'] : provider;
        row['icon'] = map[provider] && map[provider]['icon'] ? map[provider]['icon'] : `fa fa-${provider}`;
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
