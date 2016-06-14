import {Component} from '@angular/core';
import {UserService, PremiumSupport} from "@flaper/angular";
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {PageService} from "../../../../services/helpers/PageService";
import {PremiumMessages} from "../../../premiumSupport/PremiumMessages/PremiumMessages";

@Component({
  selector: 'page-premium-support',
  directives: [PremiumMessages],
  template: require('./PagePremiumSupport.html'),
  styles: [require('./PagePremiumSupport.scss')]
})
export class PagePremiumSupport {
  form:ControlGroup;
  messages = [];

  constructor(private _user:UserService, _page:PageService, private fb:FormBuilder,
              private premiumSupport:PremiumSupport) {
    if (!(_user.currentUser && _user.currentUser.extra.hasPremiumSupport() )) {
      _page.navigateToDefault();
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
          let control = <Control> this.form.controls['message'];
          control.updateValue('', {});
          this.requestMessages();
        }, (e) => {
        })
    }
  }

  requestMessages() {
    this.premiumSupport.getDialog(this._user.currentUserId).subscribe(data => this.messages = data);
  }
}
