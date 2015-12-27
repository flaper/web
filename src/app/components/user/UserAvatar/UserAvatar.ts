/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {UserService} from "../../../services/UserService";
import {User} from "../../../models/common/User";

@Component({
  selector: 'user-avatar',
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  template: require('./UserAvatar.html')
})
export class UserAvatar {
  @Input()
  userId:string;

  user:User;

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(user => this.user = user);
  }
}
