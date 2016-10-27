import {Component} from '@angular/core';
import {User} from "@flaper/angular";
import {PageUser} from "../../../PageUser/PageUser";


@Component({
  selector: 'page-user-like',
  template: require('./UserLike.html'),
})

export class UserLike {
  user: User;
  fanbase;

  constructor() {
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
    });
  }
}
