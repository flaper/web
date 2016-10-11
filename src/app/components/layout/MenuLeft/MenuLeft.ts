import {Component, ElementRef} from '@angular/core';
import {ACL, AuthService, ObjectService, UserService} from "@flaper/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageService} from "../../../services/helpers/PageService";
import {Router} from "@angular/router";
let _get = require('lodash/get');

@Component({
  selector: 'menu-left',
  styles: [require('./MenuLeft.scss')],
  template: require('./MenuLeft.html')
})
export class MenuLeft {
  form:FormGroup;
  items = [
    {label: 'Баллы', route: ['/s', 'Баллы'], iconClass: 'fa fa-money'},
    {label: 'Правила', route: ['/s', 'Правила'], iconClass: 'fa fa-info'},
    {label: 'О проекте', route: ['/s', 'Флапер'], iconClass: 'fa fa-info-circle'}
  ];

  constructor(private _user:UserService, private acl:ACL, private elementRef:ElementRef, private _object:ObjectService,
              private _page:PageService, private auth:AuthService, private fb:FormBuilder, private router:Router) {
  }
  ngOnInit() {
    let searchText = "";
    this.form = this.fb.group({
      searchText: [searchText],
    });
  }
  hasToggle() {
    let item = ls.getItem('ml-toggle');
    try {
      item = JSON.parse(item);
    }
    catch (e) {
      return false;
    }

    return item;
  }

  toggle() {
    //mobile && tablets collapsed by default, desktop not
    let el = this.elementRef.nativeElement.querySelector('.ml');
    el.classList.toggle('ml-toggle');
    ls.setItem('ml-toggle', el.classList.contains('ml-toggle'));
  }

  toggleSm() {
    let el = this.elementRef.nativeElement.querySelector('#ml-items');
    el.classList.remove('mobile-collapsed');
    let $el:any = $(el);
    $el.collapse('toggle');
  }

  logout() {
    this.auth.logout();
  }

  hasPremiumSupport() {
    let premiumSupport = _get(this._user.currentUser, 'extra.premiumSupport', null);
    return premiumSupport && premiumSupport > (new Date().toISOString());
  }

  onSubmit(event) {
    let searchText = this.form.controls['searchText'].value.replace('/[^A-Za-zА-Яа-я!@#$,\. 0-9]/ig',"");
    if (searchText.length === 0) return false;
    this.router.navigate(["/o",searchText]);
  }
  handleSearchClick() {
    if (!this.form.controls['searchText'].value) {
      let navbar = document.getElementById('alterNavbar');
        navbar.querySelector('input[name="searchText"]').focus();
    }
  }
  handleBlur(){
    if (!this.form.controls['searchText'].value) {
      let navbar = document.getElementById('alterNavbar');
      navbar.classList.remove('search-active');
    }
  }
  handleFocus() {
    let navbar = document.getElementById('alterNavbar');
    navbar.classList.add('search-active');
  }
}
