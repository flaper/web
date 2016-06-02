import {Component} from '@angular/core';
import {AuthService, UserService} from "flaper";
import {PageService} from "../../../services/helpers/PageService";

@Component({
  selector: 'navbar',
  styles: [require('./navbar.scss')],
  template: require('./navbar.html')
})
export class Navbar {
  constructor(private authService:AuthService, private _user:UserService,
              private pageService:PageService) {
  }

  logout() {
    this.authService.logout();
  }
}
