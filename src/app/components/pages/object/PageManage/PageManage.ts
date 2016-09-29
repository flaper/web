import {Component} from '@angular/core';
import {FObject, UserService, User} from "@flaper/angular";

@Component({
  selector: 'page-manage',
  template: require('./PageManage.html'),
  styles: [require('./PageManage.scss')]
})
export class PageManage {
  obj:FObject;
  foundUsers:User[] = [];
  constructor(private _user:UserService) {
  }
  whenFound(event) {
    console.log(event);
  }
}
