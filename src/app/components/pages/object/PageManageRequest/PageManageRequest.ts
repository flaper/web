import {Component} from 'angular2/core';
import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {FObject} from "../../../../models/common/FObject";
import {ScreenService} from "../../../../services/helpers/ScreenService";
import {LayoutObject} from "../LayoutObject/LayoutObject";

@Component({
  selector: 'page-manage-request',
  template: require('./PageManageRequest.html'),
  styles: [require('./PageManageRequest.scss')]
})
export class PageManageRequest {
  obj:FObject;

  form:ControlGroup;
  error:string;

  constructor(private fb:FormBuilder) {
    this.obj = LayoutObject.Object;
    this.form = this.fb.group({
      name: ['', Validators.required],
      position: [''],
      email: [''],
      phone: [''],
    });
  }

  onSubmit() {

  }
}
