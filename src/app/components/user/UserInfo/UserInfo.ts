import {Component} from 'angular2/core';
import {User} from "../../../models/common/User";
import {PageUser} from "../../pages/user/PageUser";

@Component({
  selector: 'page-user-info',
  styles: [require('./UserInfo.scss')],
  template: require('./UserInfo.html')
})
export class UserInfo {
  user:User;

  constructor() {
    this.user = PageUser.User;
  }
}
