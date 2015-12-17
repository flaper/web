import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'page-login',
  directives: [FORM_DIRECTIVES],
  pipes: [],
  styles: [require('./login.scss')],
  template: require('./login.html')
})
export class PageLogin {
  constructor() {
  }
}
