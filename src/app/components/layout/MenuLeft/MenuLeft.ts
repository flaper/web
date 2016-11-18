import {Component} from '@angular/core';
import {AuthService, UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {UserMenuService} from "../../../services/user/UserMenuService";


@Component({
  selector: 'menu-left',
  styles: [require('./MenuLeft.scss')],
  template: require('./MenuLeft.html')
})
export class MenuLeft {


  constructor(private _user:UserService, private _auth:AuthService,
              private _menu:UserMenuService ,private _page:PageService) {
  }

  logout() {
    this._auth.logout();
  }

}
