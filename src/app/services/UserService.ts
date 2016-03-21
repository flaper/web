import {Injectable} from 'angular2/core';
import {User} from "../models/common/User";
import {AuthService} from "./AuthService";
import {ApiService} from "./ApiService";
import * as Rx from 'rxjs';

@Injectable()
export class UserService {
  currentUserId:string;
  currentUser:User;
  currentUserObservable:Rx.Subject<User>;

  constructor(private api:ApiService, authService:AuthService) {
    authService.currentUserObservable.subscribe((user) => {
      this.currentUser = user;
      this.currentUserId = user ? user.id : null;
    });
    this.currentUserObservable = authService.currentUserObservable;
  }

  private _usersCache:Map<string, User> = new Map<string, User>();

  isCurrentUser(user:User) {
    return this.currentUser && user && this.currentUser.id === user.id;
  }

  getById(id) {
    if (id === this.currentUserId) {
      return this.currentUserObservable;
    }
    if (!this._usersCache[id]) {
      let obs = this.api.request('get', `users/${id}`).publishLast();
      obs.connect();
      this._usersCache[id] = obs;
    }
    return this._usersCache[id];
  }

  getUserIdentitiesById(id) {
    return this.api.request('get', `users/${id}/identities`)
  }
}

export let USER_SERVICE_PROVIDER = [UserService];
