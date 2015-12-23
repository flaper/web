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
    return false;
  }

  isOwner(model) {
    return model.userId && this.userService.currentUser && model.userId === this.userService.currentUser.id;
  }
}
export let ACL_PROVIDER = [ACL];
