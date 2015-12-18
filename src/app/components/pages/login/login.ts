import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuthService, PROVIDERS} from "../../../services/AuthService";

@Component({
  selector: 'page-login',
  directives: [FORM_DIRECTIVES],
  pipes: [],
  styles: [require('./login.scss')],
  template: require('./login.html')
})
export class PageLogin {
  PROVIDERS = PROVIDERS;

  constructor(private authService:AuthService) {
  }
}
