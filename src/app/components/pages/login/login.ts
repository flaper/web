import {Component} from 'angular2/core';
import {PROVIDERS} from "../../../services/AuthService";

@Component({
  selector: 'page-login',
  styles: [require('./login.scss')],
  template: require('./login.html')
})
export class PageLogin {
  PROVIDERS = PROVIDERS;

  constructor() {
  }
}
