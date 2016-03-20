import {Component} from 'angular2/core';
import {User} from "../../../models/common/User";
import {PageUser} from "../../pages/user/PageUser";
import {UserService} from "../../../services/UserService";

@Component({
  selector: 'page-user-info',
  styles: [require('./UserInfo.scss')],
  template: require('./UserInfo.html')
})
export class UserInfo {
  user:User;
  identities:Array = null;

  constructor(userService:UserService) {
    this.user = PageUser.User;
    userService.getUserIdentitiesById(this.user.id).subscribe(identities => {
      this.identities = identities.map(row => {
        let provider = row['provider'];
        let map = {
          vk: 'Вконтакте',
          facebook: 'Facebook',
          google: 'Google Plus',
          odnoklassniki: 'Одноклассники'
        };
        row['provider'] = map[provider] ? map[provider] : provider;
        return row;
      });
    });
  }
}
