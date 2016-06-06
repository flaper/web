import {Component} from '@angular/core';
import {FObject, UserService} from "@flaper/angular";

@Component({
  selector: 'page-manage',
  template: require('./PageManage.html'),
  styles: [require('./PageManage.scss')]
})
export class PageManage {
  obj:FObject;

  constructor(private _user:UserService) {
  }
}
