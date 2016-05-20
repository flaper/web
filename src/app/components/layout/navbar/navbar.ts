import {Component} from '@angular/core';
import {AuthService} from "../../../services/AuthService";
import {UserService} from "../../../services/UserService";
import {PageService} from "../../../services/helpers/PageService";

@Component({
  selector: 'navbar',
  styles: [require('./navbar.scss')],
  template: require('./navbar.html')
})
export class Navbar {
  constructor(private authService:AuthService, private userService:UserService,
              private pageService:PageService) {
  }

  logout() {
    this.authService.logout();
  }
}
