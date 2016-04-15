import {Component} from 'angular2/core';
import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {FObject} from "../../../../models/common/FObject";
import {ScreenService} from "../../../../services/helpers/ScreenService";
import {LayoutObject} from "../LayoutObject/LayoutObject";
import {UserService} from "../../../../services/UserService";

@Component({
  selector: 'page-manage-request',
  template: require('./PageManageRequest.html'),
  styles: [require('./PageManageRequest.scss')]
})
export class PageManageRequest {
  obj:FObject;

  form:ControlGroup;
  error:string;

  constructor(private fb:FormBuilder, _user:UserService) {
    this.obj = LayoutObject.Object;
    let name = _user.currentUser ? _user.currentUser.displayName : '';
    this.form = this.fb.group({
      name: [name, Validators.required],
      position: [''],
      email: ['', Validators.required],
      phone: [''],
    });
  }

  onSubmit() {

  }
}
