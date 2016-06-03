import { Component } from '@angular/core';
import {UserService} from "@flaper/angular";

@Component({
  selector: 'Users',
  template: require('./PageUsers.html'),
  styles: [require('./PageUsers.scss')]
})
export class PageUsers {
  users;

  constructor(private _user:UserService) {
    this.getUsersByQuery();
  }

  onChange(e) {
    let filter = e.target.value;
    this.getUsersByQuery(filter);
  }

  lastQuery = null;

  getUsersByQuery(filter = "") {
    if (this.lastQuery === filter) return;

    let where = {};
    if (filter.length > 2) {
      where = {
        displayName: {like: filter, options: 'i'}
      };
    }
    this._user.get({where, order: 'storiesNumber DESC, updated DESC'}).subscribe(data => this.users = data);
    this.lastQuery = filter;
  }
}
