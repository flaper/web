import {Component} from '@angular/core';
import {UserService, PremiumSupport} from "@flaper/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageService} from "../../../services/helpers/PageService";
import {Router} from "@angular/router";

@Component({
  selector: 'page-premium-support',
  template: require('./PagePremiumSupport.html'),
  styles: [require('./PagePremiumSupport.scss')]
})
export class PagePremiumSupport {
  form: FormGroup;
  messages = [];

  constructor(private _user: UserService, _page: PageService, private fb: FormBuilder, private router: Router,
              private premiumSupport: PremiumSupport) {
    if (!_user.hasCurrentUser()) {
      _page.navigateToLogin('Для Премиум Поддержки необходима авторизация');
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
  }

  onUser() {
    if (!this._user.currentUser.extra.hasPremiumSupport()) {
      this.router.navigateByUrl('/p/support/payment');
      return;
    }
    this.form = this.fb.group({
      message: ['', Validators.required]
    });
    this.requestMessages();
  }

  onSubmit() {
    if (this.form.valid) {
      let message = this.form.value.message;
      this.premiumSupport.post({toId: 0, message})
        .subscribe((message) => {
          this.messages.unshift(message);
          let control = <FormControl> this.form.controls['message'];
          control.setValue('', {});
          this.requestMessages();
        }, (e) => {
        })
    }
  }

  requestMessages() {
    this.premiumSupport.getDialog(this._user.currentUserId).subscribe(data => this.messages = data);
  }
}
