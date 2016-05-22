import {Injectable} from '@angular/core';
import {User} from "../models/common/User";
import {ApiService} from 'flaper';
import {UserService} from "./UserService";
import * as Rx from 'rxjs';
let _forOwn = require('lodash/forOwn');

@Injectable()
export class UserSettings {
  constructor(private api:ApiService, private userService:UserService) {
    this.userService.currentUserObservable.subscribe(user => {
      if (!user) {
        this._my = null;
        this._myObservable = null;
      }
    })
  }

  static SETTINGS = {
    HIDE_SOCIAL_LINKS: {
      name: 'HIDE_SOCIAL_LINKS',
      def: false
    },
    HIDE_POINTS: {
      name: 'HIDE_POINTS',
      def: false
    }
  };

  private _my:Array<any> = null;
  private _myObservable:Rx.Observable<any> = null;

  getMy(settings) {
    let name = settings.name;
    let o;
    if (this._my) {
      o = Rx.Observable.of(this._my);
    } else if (!this._myObservable) {
      o = this.requestMy();
    } else {
      o = this._myObservable;
    }
    return o.map(result => {
      return result.hasOwnProperty(name) ? result[name] : settings.def;
    })
  }

  setMy(settings, value) {
    let name = settings.name;
    let id = this.userService.currentUserId;
    this.api.request('post', `users/${id}/settings/${name}`, {value: value}).publishLast().connect();
  }

  requestMy() {
    let id = this.userService.currentUserId;
    this._myObservable = this.getByUserId(id).map(data => {
      this._my = data;
      return data;
    });
    return this._myObservable;
  }

  getByUserId(id) {
    return this.api.request('get', `users/${id}/settings`).map(data => {
      _forOwn(UserSettings.SETTINGS, (settings) => {
        if (!data.hasOwnProperty(settings.name)) {
          data[settings.name] = settings.def;
        }
      });
      return data;
    })
  }
}

export let USER_SETTINGS_PROVIDER = [UserSettings];
