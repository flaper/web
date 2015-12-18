import {Component} from 'angular2/core';
import {AuthService} from "../../../services/AuthService";

@Component({
  selector: 'page-home',
  directives: [],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class PageHome {
  constructor(private authService:AuthService) {

  }
}
