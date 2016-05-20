import {Injectable} from '@angular/core';
import {UserService} from "../services/UserService";
var _get = require('lodash/get.js');

@Injectable()
export class ACL {
  constructor(private userService:UserService) {

  }

  LIST = {
    Story: {
      write: ['$owner', 'admin'],
      delete: ['$owner'],
      deny: ['admin']
    },
    Comment: {
      write: ['$owner', 'super']
    }
  };

  can(action, model = null) {
    let list = null;
    if (['admin', 'super'].indexOf(action) > -1) {
      list = [action];
    } else {
      list = _get(this.LIST, action);
    }
    if (!list) {
      return false;
    }

    let result = false;
    for (let i = 0, len = list.length; i < len; i++) {
      let item = list[i];
      switch (item) {
        case '$owner':
          result = result || this.isOwner(model);
          break;
        case 'admin':
          result = result || this.isAdmin();
          break;
        case 'super':
          result = result || this.isSuper();
          break;
      }
    }
    return result;
  }

  getRoles() {
    return _get(this.userService.currentUser, "roles");
  }

  isAdmin() {
    let roles:any = this.getRoles();
    return roles && (roles.indexOf('admin') > -1) || this.isSuper();
  }

  isSuper() {
    let roles:any = this.getRoles();
    return roles && (roles.indexOf('super') > -1)
  }

  isOwner(model) {
    return model.userId && model.userId === this.userService.currentUserId;
  }
}
export let ACL_PROVIDER = [ACL];
