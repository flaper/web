/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {UserService} from "../../../services/UserService";
import {User} from "../../../models/common/User";

@Component({
  selector: 'user-link',
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  template: require('./UserLink.html')
})
export class UserLink {
  @Input()
  userId:string;

  @Input()
  hiddenStatsXs:boolean = false;

  user:User;

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(user => this.user = user);
  }
}
