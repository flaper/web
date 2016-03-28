import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {UserService} from "../UserService";
const KEY = 'DEFAULT_PAGE';

@Injectable()
export class DefaultPageService {
  constructor(private userService:UserService, private router:Router) {

  }

  get() {
    let value = localStorage.getItem(KEY);
    value = ['News', 'Home'].indexOf(value) > -1 ? value : null;
    if (!value) {
      value = this.userService.currentUserId ? 'News' : 'Home';
    }
    return value;
  }

  goToDefault() {
    this.router.navigate([this.get()]);
  }

  set(value) {
    localStorage.setItem(KEY, value);
  }
}

export let DEFAULT_PAGE_PROVIDER = [DefaultPageService];

