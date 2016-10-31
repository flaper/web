import {Component} from '@angular/core';
import {User, UserService} from "@flaper/angular";
import {PageUser} from "../../PageUser/PageUser";

@Component({
  selector: 'page-user-stories',
  styles: [require('./UserStories.scss')],
  template: require('./UserStories.html')
})
export class UserStories {
  user: User;
  storyStatus: string = 'active';

  constructor(private _user: UserService) {
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
    });
  }

  showStories(status: string) {
    this.storyStatus = status;
  }

  isActive(status: string) {
    return this.storyStatus === status;
  }

  isVisible(roles: string[]) {
    let isSelf: boolean = Boolean(this._user.currentUser && this._user.currentUser == this.user);
    let isSuper: boolean = Boolean(this._user.currentUser && this._user.currentUser.roles.indexOf('super') >= 0);
    return roles.indexOf('all') >= 0 || isSelf || isSuper;
  }
}
