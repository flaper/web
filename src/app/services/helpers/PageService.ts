import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {JwtToken} from "@flaper/angular";
import {PageLogin} from "../../components/pages/login/PageLogin";
const PAGE_DEFAULT = 'PAGE_DEFAULT';
const PAGE_BEFORE_LOGIN = '_PAGE_BEFORE_LOGIN';

@Injectable()
export class PageService {
  private _goto = null;
  private _initial_done = false;

  constructor(private router: Router) {
    PageService._navigateAfterLogin = this.navigateAfterLogin.bind(this);
    this.router.events.subscribe((event)=> {
      if (event instanceof NavigationEnd) {
        this._initial_done = true;
        // hack т.к. начальный afterLogin редирект на 1 ноября 2016 года сбрасывался изначальным событимем редиректа
        if (this._goto) {
          this._goto();
          this._goto = null;
        }
      }
    })
  }

  public getDefault() {
    let value = PageService.GetFromLS();
    let hasUser = JwtToken.get() ? true : false;
    if (!value) {
      value = hasUser ? '/p/news' : '/';
    }
    return value;
  }

  public setDefault(value) {
    ls.setItem(PAGE_DEFAULT, value);
  }

  public navigateToDefault() {
    this.router.navigateByUrl(this.getDefault());
  }


  private static GetFromLS() {
    let value = ls.getItem(PAGE_DEFAULT);
    value = ['/p/news', '/'].indexOf(value) > -1 ? value : null;
    return value;
  }

  public navigateToLogin(message = null) {
    let path = this.router.url;
    if (!path || path === '/' || (path.indexOf('/login') > -1)) {
      ls.removeItem(PAGE_BEFORE_LOGIN);
    } else {
      ls.setItem(PAGE_BEFORE_LOGIN, `${path}${window.location.search}`);
    }
    PageLogin.MESSAGE = message ? message : "";
    this.router.navigateByUrl('/p/login');
  }

  public navigateAfterLogin() {
    let path = ls.getItem(PAGE_BEFORE_LOGIN);
    if (path) {
      this._goto = () => this.router.navigateByUrl(path);
      //this.router.routerState.snapshot.
    } else {
      let route = this.getDefault();
      this._goto = () => this.router.navigate([route]);
    }
    if (this._initial_done) {
      this._goto();
      this._goto = null;
    }
  }

  private static _navigateAfterLogin = null;

  public static NavigateAfterLogin() {
    if (PageService._navigateAfterLogin) {
      PageService._navigateAfterLogin();
    }
  };
}

export let PAGE_PROVIDER = [PageService];

