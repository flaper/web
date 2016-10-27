import {Component} from '@angular/core';
import {User} from "@flaper/angular";
import {PageUser} from "../../../PageUser/PageUser";

@Component({
  selector: 'page-user-favorite',
  template: require('./UserFavorite.html'),
})

export class UserFavorite {
  user: User;
  fanbase;

  constructor() {
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
    });
  }
}
