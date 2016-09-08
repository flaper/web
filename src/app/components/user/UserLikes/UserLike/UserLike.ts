import {Component} from '@angular/core';
import {User} from "@flaper/angular";
import {UserLikes} from "../UserLikes";
import {PageUser} from "../../../pages/user/PageUser/PageUser";

@Component({
  selector: 'page-user-like',
  template: require('./UserLike.html'),
  entryComponents: [UserLikes]
})

export class UserLike{
  user: User;
  fanbase;
  constructor(){
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
    });
  }
}
