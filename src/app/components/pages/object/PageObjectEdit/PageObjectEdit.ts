import {Component} from '@angular/core';
import {FObject, UserService} from "@flaper/angular";
import {LayoutObject} from "../LayoutObject/LayoutObject";

@Component({
  selector: 'page-object-edit',
  template: require('./PageObjectEdit.html'),
  styles: [require('./PageObjectEdit.scss')]
})
export class PageObjectEdit {
  obj: FObject;

  constructor(private _user: UserService) {
    LayoutObject.ObjectObservable.subscribe(obj=> {
      this.obj = obj;
    });
  }
}
