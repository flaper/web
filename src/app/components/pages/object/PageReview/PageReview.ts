import {Component} from '@angular/core';
import {FObject, UserService} from "@flaper/angular";
import {ScreenService} from "../../../../services/helpers/ScreenService";
import {LayoutObject} from "../LayoutObject/LayoutObject";
import {SimpleWrite} from "../../../story/write/SimpleWrite/SimpleWrite";

@Component({
  selector: 'page-review',
  entryComponents: [SimpleWrite],
  template: require('./PageReview.html'),
  styles: [require('./PageReview.scss')]
})
export class PageReview {
  obj:FObject;
  images = [];

  constructor(private _user:UserService) {
    LayoutObject.ObjectObservable.subscribe(obj=> {
      this.obj = obj;
      let imagesLimit = ScreenService.isXl() ? 6 : 4;
      this.images = this.obj.getImages({filterAvatar: true}).slice(0, imagesLimit);
    });
  }

  getManageLink() {
    let ifOwner = false;
    if (this._user.currentUser) {
      ifOwner = this._user.currentUser.extra.getObjects().indexOf(this.obj.id) > -1;
    }
    return ifOwner ? '/p/manageSupport' : 'manageRequest';
  }

}
