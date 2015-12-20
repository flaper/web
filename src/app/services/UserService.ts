import {Injectable} from 'angular2/core';
import {User} from "../models/common/User";
import {AuthService} from "./AuthService";
import {ApiService} from "./ApiService";
import * as Rx from 'rxjs';

@Injectable()
export class UserService {
  currentUser:User;
  currentUserObservable:Rx.Subject<User>;

  constructor(private api:ApiService, authService:AuthService) {
    authService.currentUserObservable.subscribe((user) => this.currentUser = user);
    this.currentUserObservable = authService.currentUserObservable;
  }

  getById(id) {
    return this.api.request('get', `users/${id}`);
  }
}

export let USER_SERVICE_PROVIDER = [UserService];
