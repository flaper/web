import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {UserService} from "../../../services/UserService";
import {User} from "../../../models/common/User";
import {StoriesAutoList} from "../../story/StoriesAutoList/StoriesAutoList";
import {AccountService} from "../../../services/AccountService";

@Component({
  selector: 'page-user',
  directives: [StoriesAutoList],
  pipes: [],
  styles: [require('./PageUser.scss')],
  template: require('./PageUser.html')
})
export class PageUser {
  user:User;
  amount:number = null;


  constructor(routeParams:RouteParams, private userService:UserService, private accountService:AccountService) {
    let id = routeParams.params['id'];
    this.userService.getById(id).subscribe(user => {
      this.user = user;
      if (this.userService.currentUser) {
        this.accountService.getAmountById(user.id)
          .subscribe(amount => this.amount = amount);
      }
    });
  }
}
