import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FObject, UserService, ManageRequestService} from "@flaper/angular";
import {LayoutObject} from "../LayoutObject/LayoutObject";
import {PageService} from "../../../../services/helpers/PageService";
import {Metrika} from "../../../../services/metrics/Metrika";
import {PaymentService} from "../../../../services/payment/PaymentService";
import {CostService} from "../../../../services/payment/CostService";

// страница запроса на управление страницей
@Component({
  selector: 'page-manage-request',
  template: require('./PageManageRequest.html'),
  styles: [require('./PageManageRequest.scss')]
})
export class PageManageRequest {
  SUM = CostService.MANAGE_REQUEST;
  obj: FObject;

  manageRequest: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private _user: UserService, private _manageRequest: ManageRequestService,
              _page: PageService, private _payment: PaymentService) {
    LayoutObject.ObjectObservable.subscribe(obj => {
      this.obj = obj;
      Metrika.setParam('page', 'manageRequest');
      if (!_user.hasCurrentUser()) {
        _page.navigateToLogin(`Для управления страницей <strong>"${this.obj.title}"</strong>  нужно войти на сайт.`);
        return;
      }

      if (this._user.currentUser) {
        this.onUser();
      } else {
        // пользователь может быть еще в процессе авторизации
        this._user.currentUserObservable.subscribe(user=> {
          if (user) this.onUser();
        });
      }
    });
  }

  onUser() {
    let name = this._user.currentUser ? this._user.currentUser.displayName : '';
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
    if (!this.manageRequest) return;
    let data = {
      id: `manager_request_${this.manageRequest.id}`,
      amount: this.SUM,
      description: `Управление страницей id #${this.manageRequest.subjectId}`,
      email: this.manageRequest.email,
      phone: this.manageRequest.phone,
      customerName: this.manageRequest.name
    };
    this._payment.pay(data);
  }
}
