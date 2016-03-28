import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthService} from "../../../services/AuthService";
import {UserService} from "../../../services/UserService";
import {DefaultPageService} from "../../../services/helpers/DefaultPageService";

@Component({
  selector: 'navbar',
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./navbar.scss')],
  template: require('./navbar.html')
})
export class Navbar {
  constructor(private authService:AuthService, private userService:UserService,
              private defaultPage:DefaultPageService) {
  }

  logout() {
    this.authService.logout();
  }
}
