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

  private _usersCache:Map<string, Rx.ReplaySubject<User>> = new Map<string, Rx.ReplaySubject<User>>();

  isCurrentUser(user:User) {
    return this.currentUser && user && this.currentUser.id === user.id;
  }

  getById(id) {
    if (id === this.currentUserId) {
      return this.currentUserObservable;
    }
    if (!this._usersCache.has(id)) {
      this._usersCache.set(id, new Rx.ReplaySubject<User>(1));
      this.api.request('get', `users/${id}`)
        .subscribe(user => this._usersCache.get(user.id).next(user));
    }
    return this._usersCache.get(id);
  }

  requestIds(allIds) {
    allIds = _.uniq(allIds);
    let ids = allIds.filter(id => !this._usersCache.has(id));
    if (ids.length > 0) {
      ids.forEach((id) => {
        this._usersCache.set(id, new Rx.ReplaySubject<User>(1));
      });

      //let's request for allIds to update cache if we need at least one
      let where = {id: {inq: allIds}};
      let filter = {where: where};
      this.api.request('get', 'users', {filter: JSON.stringify(filter)})
        .subscribe(users => {
          users.forEach(user => this._usersCache.get(user.id).next(user));
        })
    }
  }

  getUserIdentitiesById(id) {
    return this.api.request('get', `users/${id}/identities`)
  }
}

export let USER_SERVICE_PROVIDER = [UserService];
