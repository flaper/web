import {Component} from '@angular/core';
import {AuthService, UserService} from "@flaper/angular";
import {PageService} from "../../../../services/helpers/PageService";
import {UserMenuService} from "../../../../services/user/UserMenuService";

let _get = require('lodash/get');

@Component({
  selector: "page-user-menu",
  styles: [require("./PageUserMenu.scss")],
  template: require("./PageUserMenu.html")
})

export class PageUserMenu {

  constructor(private _user: UserService, private _page: PageService,
              private _auth: AuthService, private _menu: UserMenuService) {
  }

  logout() {
    this._auth.logout();
  }

}
