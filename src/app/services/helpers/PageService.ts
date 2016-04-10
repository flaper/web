import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {JwtToken} from "../JwtToken";
const PAGE_DEFAULT = 'PAGE_DEFAULT';
const PAGE_BEFORE_LOGIN = '_PAGE_BEFORE_LOGIN';

@Injectable()
export class PageService {
  constructor(private router:Router) {

  }

  public getDefault() {
    let value = PageService.GetFromLS();
    let hasUser = JwtToken.get() ? true : false;
    if (!value) {
      value = hasUser ? 'News' : 'Home';
    }
    return value;
  }

  public setDefault(value) {
    ls.setItem(PAGE_DEFAULT, value);
  }

  public navigateToDefault() {
    this.router.navigate([this.getDefault()]);
  }


  private static GetFromLS() {
    let value = ls.getItem(PAGE_DEFAULT);
    value = ['News', 'Home'].indexOf(value) > -1 ? value : null;
    return value;
  }

  public navigateToLogin() {
    let path = this.router.currentInstruction.toRootUrl();
    if (!path || path === '/' || (path.indexOf('/Login') > -1)) {
      ls.removeItem(PAGE_BEFORE_LOGIN);
    } else {
      ls.setItem(PAGE_BEFORE_LOGIN, `${path}${window.location.search}`);
    }
    this.router.navigate(['/Login']);
  }

  public navigateAfterLogin() {
    let path = ls.getItem(PAGE_BEFORE_LOGIN);
    if (path) {
      this.router.navigateByUrl(path);
    } else {
      let route = this.getDefault();
      this.router.navigate([route]);
    }
  }
}

export let PAGE_PROVIDER = [PageService];

