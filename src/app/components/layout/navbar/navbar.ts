import {Component} from '@angular/core';
import {AuthService, UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {Github} from "./github/github";

@Component({
  selector: 'navbar',
  entryComponents: [Github],
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
