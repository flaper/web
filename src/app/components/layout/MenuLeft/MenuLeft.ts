import {Component, ElementRef} from '@angular/core';
import {ACL, AuthService, ObjectService, UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
let _get = require('lodash/get');

@Component({
  selector: 'menu-left',
  styles: [require('./MenuLeft.scss')],
  template: require('./MenuLeft.html')
})
export class MenuLeft {
  items = [
    {label: 'Баллы', route: ['/Story', {slug: 'Баллы'}], iconClass: 'fa fa-money'},
    {label: 'Правила', route: ['/Story', {slug: 'Правила'}], iconClass: 'fa fa-info'},
    {label: 'О проекте', route: ['/Story', {slug: 'Флапер'}], iconClass: 'fa fa-info-circle'}
  ];

  constructor(private _user:UserService, private acl:ACL, private elementRef:ElementRef, private _object:ObjectService,
              private _page:PageService, private auth:AuthService) {
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
}
