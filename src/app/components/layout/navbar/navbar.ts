import {Component} from '@angular/core';
import {AuthService, UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Github} from "./github/github";

@Component({
  selector: 'navbar',
  entryComponents: [Github],
  styles: [require('./navbar.scss')],
  template: require('./navbar.html')
})
export class Navbar {
  form:FormGroup;
  constructor(private authService:AuthService, private _user:UserService,
              private pageService:PageService, private fb:FormBuilder,
              private router:Router) {
  }
  ngOnInit() {
    let searchText = "";
    this.form = this.fb.group({
      searchText: [searchText],
    });
  }
  onSubmit(event) {
    let searchText = this.form.controls['searchText'].value.replace('/[^A-Za-zА-Яа-я!@#$,\. 0-9]/ig',"");
    if (searchText.length === 0) return false;
    this.router.navigate(["/o",searchText]);
  }
  logout() {
    this.authService.logout();
  }
  handleSearchClick() {
    if (!this.form.controls['searchText'].value) {
      document.querySelector('input[name="searchText"]').focus();
    }
  }
  handleBlur(){
    if (!this.form.controls['searchText'].value) {
      let navbar = document.getElementById('mainNavbar');
      navbar.classList.remove('search-active');
    }
  }
  handleFocus() {
    let navbar = document.getElementById('mainNavbar');
    navbar.classList.add('search-active');
  }
}
