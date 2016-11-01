import {Component} from '@angular/core';
import {AuthService, UserService,UserMenuService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {Router} from "@angular/router";
let _get = require('lodash/get');

@Component({
  selector: 'menu-left',
  styles: [require('./MenuLeft.scss')],
  template: require('./MenuLeft.html')
})
export class MenuLeft {


  constructor(private _user:UserService, private _auth:AuthService,
              private _menu:UserMenuService,private _page:PageService) {
  }

  logout() {
    this._auth.logout();
  }

}
