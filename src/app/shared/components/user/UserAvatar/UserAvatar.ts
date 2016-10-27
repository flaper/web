import {Component, Input} from '@angular/core';
import {UserService} from "@flaper/angular";
import {User} from "@flaper/angular";

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
  id:string;

  @Input()
  size:string;

  sizePx:number;

  user:User;

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.setSizePx();
    //noinspection TypeScriptUnresolvedFunction
    this.userService.getById(this.id).subscribe(user => this.user = user);
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
