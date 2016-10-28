import {Component, ElementRef} from '@angular/core';
import {UserService, PremiumSupport} from "@flaper/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-admin-support',
  template: require('./PageAdminSupport.html'),
  styles: [require('./PageAdminSupport.scss')]
})
export class PageAdminSupport {
  form:FormGroup;
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
    let control = <FormControl> this.form.controls['message'];
    control.setValue('', {});
  }

  requestDialog() {
    this.premiumSupport.getDialog(this.activeDialog).subscribe(data => this.messages = data);
  }
}
