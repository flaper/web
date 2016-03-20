import {Component} from 'angular2/core';
import {User} from "../../../models/common/User";
import {PageUser} from "../../pages/user/PageUser";
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
