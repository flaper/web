import {Component} from '@angular/core';
import {FObject, UserService} from "@flaper/angular";
import {ScreenService} from "../../../../services/helpers/ScreenService";
import {LayoutObject} from "../LayoutObject/LayoutObject";

@Component({
  selector: 'page-object-main',
  template: require('./PageObjectMain.html'),
  styles: [require('./PageObjectMain.scss')]
})
export class PageObjectMain {
  obj:FObject;
  images = [];

  constructor(private _user:UserService) {
    this.obj = LayoutObject.Object;
    let imagesLimit = ScreenService.isXl() ? 6 : 4;
    this.images = this.obj.getImages({filterAvatar: true}).slice(0, imagesLimit);
  }

  getManageLink() {
    let ifOwner = false;
    if (this._user.currentUser) {
      ifOwner = this._user.currentUser.extra.getObjects().includes(this.obj.id);
    }
    return [ifOwner ? 'Manage' : 'ManageRequest'];
  }
}
