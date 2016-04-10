/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {UserService} from "../../../services/UserService";
import {User} from "../../../models/common/User";

@Component({
  selector: 'user-avatar',
  template: require('./UserAvatar.html')
})
export class UserAvatar {
  static SIZE = {
    MINOR: 'minor',
    MAIN: 'main'
  };

  @Input()
  userId:string;

  @Input()
  size:string;

  sizePx:number;

  user:User;

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.setSizePx();
    this.userService.getById(this.userId).subscribe(user => this.user = user);
  }

  setSizePx() {
    switch (this.size) {
      case UserAvatar.SIZE.MINOR:
        this.sizePx = 42;
        break;
      default:
        //main
        this.sizePx = 50;
        break;
    }

  }
}
