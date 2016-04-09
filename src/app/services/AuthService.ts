import {Injectable} from 'angular2/core';
import {ApiService, API_SERVER_URL} from'./ApiService';
import * as Rx from 'rxjs';
import {UrlService} from './UrlService';
import {Location} from "angular2/router";
import {User} from "../models/common/User";
import {UserService} from "./UserService";
import {PageService} from "./helpers/PageService";

interface Provider {
  name: string
  loginTitle: string
  publicUrlTitle: string
  icon?: string
  authLink?: string
}
export let PROVIDERS:Provider[] = [
  {name: 'vk', loginTitle: 'Войти через Вконтакте', publicUrlTitle: 'ВКонтакте'},
  {name: 'mail', loginTitle: 'Войти через Mail.ru', publicUrlTitle: 'Mail.ru', icon: 'fa fa-at'},
  {name: 'odnoklassniki', loginTitle: 'Войти через Одноклассники', publicUrlTitle: 'Одноклассники'},
  {name: 'facebook', loginTitle: 'Войти через Facebook', publicUrlTitle: 'Facebook'},
  {name: 'google', loginTitle: 'Войти через Google', publicUrlTitle: 'Google Plus'},
];

PROVIDERS.forEach((provider:Provider) => {
  provider.authLink = `${API_SERVER_URL}/auth/${provider.name}`;
  provider.icon = provider.icon ? provider.icon : 'fa fa-' + provider.name;
});

interface JwtData {
  id:string;
  userId:string,
  created: Date,
  //seconds
  ttl: number
}

@Injectable()
export class AuthService {
  jwtData:JwtData;
  //don't use this, better use UserService.currentUserObservable
  currentUserObservable:Rx.Subject<User>;

  constructor(private api:ApiService, private location:Location,
              pageService:PageService) {
    this.currentUserObservable = new Rx.BehaviorSubject<User>(null);
    //first let's try to get jwt from URL, then from cache
    let params = UrlService.getSearchParameters();
    if (params['jwt']) {
      let jwtString = decodeURIComponent(params['jwt']);
      this.validateJwtAndRequestUser(jwtString);
    }
    if (this.jwtData) {
      if (location.path().indexOf('/callback') > -1) {
        pageService.navigateAfterLogin();
      }
    } else {
      this.parseJwtCache();
    }
  }

  setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserObservable.next(user);
  }

  logout() {
    this._setJwtData(null);
    //we don't clear currentUser to make login process faster next time
    this.currentUserObservable.next(null);
  }

  parseJwtCache():boolean {
    let jwtString = localStorage.getItem('jwt');
    return this.validateJwtAndRequestUser(jwtString);
  }

  validateJwtAndRequestUser(jwtString:string):boolean {
    let valid = false;
    if (jwtString) {
      try {
        let jwt = JSON.parse(jwtString);
        jwt.created = new Date(jwt.created);
        let validTill = new Date(jwt.created.getTime() + jwt.ttl * 1000);
        if (jwt.userId && validTill > new Date()) {
          this._setJwtData(jwt);
          valid = true;
          this.setUserFromCache();
          this.requestUser();
        }
      }
      finally {
      }
    }
    return valid;
  }

  //can be called before requestUser to decrease app latency
  setUserFromCache() {
    let userJSON = localStorage.getItem('currentUser');
    if (userJSON) {
      try {
        let user = JSON.parse(userJSON);
        //if last user in the cache is the same as credential user
        if (this.jwtData.userId === user.id) {
          this.setCurrentUser(user);
        }
      }
      catch (e) {

      }
    }
  }

  requestUser() {
    let userId = this.jwtData.userId;
    let observer = this.api.request('get', `users/${userId}`, {filter: JSON.stringify({include: 'roles'})});
    observer.subscribe(user => this.setCurrentUser(user),
      (error) => {
        //e.g. at stage server when record removed
        this.logout();
      }
    );

    return observer;
  }

  _setJwtData(jwtData) {
    this.jwtData = jwtData;
    if (jwtData) {
      localStorage.setItem('jwt', JSON.stringify(jwtData));
    } else {
      localStorage.removeItem('jwt');
    }
  }
}


export let AUTH_SERVICE_PROVIDER = [AuthService];
