import {Component} from 'angular2/core';
import {PROVIDERS} from "../../../services/AuthService";
import {Title} from "angular2/platform/browser"

@Component({
  selector: 'page-login',
  styles: [require('./PageLogin.scss')],
  template: require('./PageLogin.html')
})
export class PageLogin {
  static MESSAGE = "";
  message;
  PROVIDERS = PROVIDERS;

  constructor(ts:Title) {
    this.message = PageLogin.MESSAGE;
    ts.setTitle('Войти на Флапер');
  }
}
