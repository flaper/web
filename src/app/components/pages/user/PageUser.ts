import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {UserService} from "../../../services/UserService";
import {User} from "../../../models/common/User";
import {StoriesAutoList} from "../../story/StoriesAutoList/StoriesAutoList";

@Component({
  selector: 'page-user',
  directives: [StoriesAutoList],
  pipes: [],
  styles: [require('./PageUser.scss')],
  template: require('./PageUser.html')
})
export class PageUser {
  user:User;


  constructor(routeParams:RouteParams, private userService:UserService) {
    let id = routeParams.params['id'];
    this.userService.getById(id).subscribe(user => this.user = user);
  }
}
