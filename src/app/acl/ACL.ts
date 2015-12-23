import {Injectable} from 'angular2/core';
import {UserService} from "../services/UserService";
import * as _ from 'lodash';

@Injectable()
export class ACL {
  constructor(private userService:UserService) {

  }

  LIST = {
    Story: {
      write: ['$owner', 'admin']
    }
  };

  can(action, model = null) {
    let list:any = _.get(this.LIST, action);
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
      }
    }
    return result;
  }

  isAdmin() {
    let roles:any = _.get(this.userService.currentUser, "roles");
    return roles && (roles.indexOf('admin') > -1)
  }

  isOwner(model) {
    return model.userId && model.userId === this.userService.currentUserId;
  }
}
export let ACL_PROVIDER = [ACL];
