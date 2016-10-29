import {Component} from '@angular/core';
import {FObject, ObjectService, UserService, User} from "@flaper/angular";
import {LayoutObject} from "../LayoutObject/LayoutObject";

// управление страницей объекта
@Component({
  selector: 'page-manage',
  template: require('./PageManage.html'),
  styles: [require('./PageManage.scss')]
})
export class PageManage {
  obj: FObject;
  moderators: User[] = [];
  foundUsers: User[] = [];

  constructor(private _user: UserService, private _object: ObjectService) {
    LayoutObject.ObjectObservable.subscribe(obj=> {
      this.obj = obj;
      this.getOwnersList(this.obj.id);
    });
  }

  getOwnersList(objectId) {
    this._object.getOwners(objectId).subscribe(owners => {
      this._user.requestIds(owners);
      this.moderators = [];
      owners.forEach(owner => this._user.getById(owner).subscribe(user => this.moderators.push(user)));
    });
  }

  addAsModerator(user) {
    this._user.addRightsForObject(user.id, this.obj.id).subscribe(data => this.getOwnersList(this.obj.id));
  }

  removeFromModerators(user) {
    console.log(user.id, this.obj.id);
    this._user.removeRightsForObject(user.id, this.obj.id).subscribe(data => this.getOwnersList(this.obj.id));
  }

  whenFound(users) {
    this.foundUsers = users;
  }
}
