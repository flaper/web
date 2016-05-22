import {Component} from '@angular/core';
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {FObject} from "../../../../models/common/FObject";
import {ScreenService} from "../../../../services/helpers/ScreenService";
import {LayoutObject} from "../LayoutObject/LayoutObject";
import {UserService} from "flaper";
import {MANAGE_REQUEST_SERVICE_PROVIDER, ManageRequestService} from "../../../../services/object/ManageRequestService";
import {PageService} from "../../../../services/helpers/PageService";
import {Metrika} from "../../../../services/metrics/Metrika";
import {PaymentService} from "../../../../services/payment/PaymentService";

@Component({
  selector: 'page-manage-request',
  template: require('./PageManageRequest.html'),
  providers: [MANAGE_REQUEST_SERVICE_PROVIDER],
  styles: [require('./PageManageRequest.scss')]
})
export class PageManageRequest {
  obj:FObject;

  manageRequest:any;
  form:ControlGroup;

  constructor(private fb:FormBuilder, _user:UserService, private _manageRequest:ManageRequestService,
              _page:PageService, private _payment:PaymentService) {
    this.obj = LayoutObject.Object;
    Metrika.setParam('page', 'manageRequest');
    if (!_user.currentUser) {
      _page.navigateToLogin(`Для управления страницей <strong>"${this.obj.title}"</strong>  нужно войти на сайт.`);
      return;
    }
    let name = _user.currentUser ? _user.currentUser.displayName : '';
    this.form = this.fb.group({
      name: [name, Validators.required],
      position: [''],
      email: ['', Validators.required],
      phone: [''],
    });
    this._manageRequest.getBySubjectId(this.obj.id).subscribe(manageRequest => this.manageRequest = manageRequest)
  }

  onSubmit() {
    if (this.form.valid) {
      let data = this.form.value;
      data.subjectId = this.obj.id;
      this._manageRequest.post(data).subscribe((manageRequest) => {
        this.manageRequest = manageRequest;
      });
    }
  }

  onCancel() {
    if (confirm('Отменить заявку?')) {
      this._manageRequest.del(this.manageRequest.id)
        .subscribe(() => this.manageRequest = null)
    }
  }

  onPay() {
    let data = {sum: 100};
    if (this.manageRequest) {
      if (this.manageRequest.email) {
        data["cps_email"] = this.manageRequest.email;
      }
      if (this.manageRequest.phone) {
        data["cps_phone"] = this.manageRequest.phone;
      }
      data["flap_subject_id"] = this.manageRequest.subjectId;
    }
    this._payment.pay(data);
  }
}
