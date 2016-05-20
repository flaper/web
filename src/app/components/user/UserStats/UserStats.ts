import {Component} from '@angular/core';
import {User} from "../../../models/common/User";
import {PageUser} from "../../pages/user/PageUser";

@Component({
  selector: 'page-user-stats',
  template: require('./UserStats.html')
})
export class UserStats {
  user:User;

  constructor() {
    this.user = PageUser.User;
  }
}
