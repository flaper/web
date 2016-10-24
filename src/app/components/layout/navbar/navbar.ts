import {Component} from '@angular/core';
import {AuthService, UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {Router,ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ObjectSearchForm} from "../../object/ObjectSearchForm/ObjectSearchForm";
import {Location} from "@angular/common";
@Component({
  selector: 'navbar',
  styles: [require('./navbar.scss')],
  template: require('./navbar.html')
})
export class Navbar {
  constructor(private authService:AuthService, private _user:UserService,
              private pageService:PageService, private router:Router,
              private route:ActivatedRoute, private location:Location) {
  }

  logout() {
    this.authService.logout();
  }
  searchFormVisible() {
    let path = window.location.pathname.split("/").filter(val => !!val);
    return path[0] != "o";
  }
  onMenuPress() {
    let path = window.location.pathname.split("/").filter(val => !!val);
    if (path.some(val => val === 'menu'))
      this.location.back();
    else
      this.router.navigate(['/p','menu']);
  }
}
