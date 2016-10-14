import {Component} from '@angular/core';
import {AuthService, UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ObjectSearchForm} from "../../object/ObjectSearchForm/ObjectSearchForm";
@Component({
  selector: 'navbar',
  styles: [require('./navbar.scss')],
  template: require('./navbar.html')
})
export class Navbar {
  constructor(private authService:AuthService, private _user:UserService,
              private pageService:PageService, private router:Router) {
  }

  logout() {
    this.authService.logout();
  }
}
