import {Component, ElementRef} from '@angular/core';
import {UserService, PremiumSupport} from "@flaper/angular";
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {PageService} from "../../../../services/helpers/PageService";
import {PremiumMessages} from "../../../premiumSupport/PremiumMessages/PremiumMessages";

@Component({
  selector: 'page-manage-support',
  directives: [PremiumMessages],
  template: require('./PageManageSupport.html'),
  styles: [require('./PageManageSupport.scss')]
})
export class PageManageSupport {
  form:ControlGroup;
  dialogs = [];

  activeDialog = null;
  messages = [];

  constructor(private _user:UserService, private premiumSupport:PremiumSupport, private fb:FormBuilder,
              private elementRef:ElementRef) {
    this.form = this.fb.group({
      message: ['', Validators.required]
    });
    this.requestDialogs();
  }

  requestDialogs() {
    this.premiumSupport.getDialogs().subscribe(data => {
      this.dialogs = data;
      if (!this.activeDialog && this.dialogs.length > 0) {
        this.selectDialog(this.dialogs[0].dialog);
      }
    });
  }

  selectDialog(dialog) {
    this.clearForm();
    let el = this.elementRef.nativeElement.querySelector('textarea');
    if (el) {
      el.focus();
    }
    this.activeDialog = dialog;
    this.requestDialog();
  }

  onSubmit() {
    if (this.form.valid) {
      let message = this.form.value.message;
      this.premiumSupport.post({toId: this.activeDialog, message})
        .subscribe((message) => {
          this.clearForm();
          this.messages.unshift(message);
          this.requestDialog();
          this.requestDialogs();
        }, (e) => {
        })
    }
  }

  clearForm() {
    let control = <Control> this.form.controls['message'];
    control.updateValue('', {});
  }

  requestDialog() {
    this.premiumSupport.getDialog(this.activeDialog).subscribe(data => this.messages = data);
  }
}
