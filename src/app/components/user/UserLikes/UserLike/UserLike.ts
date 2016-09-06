import {Component} from '@angular/core';
import {User} from "@flaper/angular";
import {UserLikes} from "../UserLikes";
import {PageUser} from "../../../pages/user/PageUser/PageUser";

@Component({
  selector: 'page-user-like',
  template: require('./UserLike.html'),
  directives: [UserLikes]
})

export class UserLike{
  user: User;
  fanbase;
  constructor(){
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
      // console.log("Hello!");
      // this.it_forMe = this._user.isCurrentUser(this.user);
      // this.getLikes(this.getWhere(this.it_forMe));
    });


    // this.fa= this.userlikes.fanbase;
    // console.log(tnbase his.fanbase);
  }

}
