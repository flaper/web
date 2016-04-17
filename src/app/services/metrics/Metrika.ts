import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Title} from "angular2/platform/browser"
import {UserService} from "../UserService";

@Injectable()
export class Metrika {
  static params:any = {};

  constructor(private router:Router, private title:Title, private _user:UserService) {
    router.subscribe((path) => this.hit(path))
  }

  hit(path) {
    let ya = (<any>window).yaCounter34469330;
    if (ya) {
      if (this._user.currentUserId) {
        Metrika.params.userId = this._user.currentUserId;
        Metrika.params.guest = false;
      } else {
        Metrika.params.guest = true;
      }
      let data = {title: this.title.getTitle()};
      data['params'] = Metrika.params;
      let l = window.location;
      let url = `${l.protocol}//${l.host}/${path}`;
      ya.hit(url, data);
      Metrika.params = {};
    }
  }

  static setParam(name, value) {
    this.params[name] = value;
  }
}

export let METRIKA_PROVIDER = [Metrika];
