import {Component} from '@angular/core';
import {User} from "@flaper/angular";
import {PageUser} from "../../pages/user/PageUser/PageUser";
import {StoriesAutoList} from "../../story/StoriesAutoList/StoriesAutoList";

@Component({
  selector: 'page-user-stories',
  directives: [StoriesAutoList],
  template: require('./UserStories.html')
})
export class UserStories {
  user:User;

  constructor() {
    this.user = PageUser.User;
  }
}
