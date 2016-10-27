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
  obj: FObject;
  images = [];
  currentImage = null; //current image id for gallery

  constructor(private _user: UserService) {
    LayoutObject.ObjectObservable.subscribe(obj=> {
      this.obj = obj;
      let imagesLimit = ScreenService.isXl() ? 6 : 4;
      this.images = this.obj.getImages({filterAvatar: true}).slice(0, imagesLimit);
    });
  }

  getLink(name) {
    return "/" + ([this.obj.mainDomain, this.obj.region, this.obj.slug, '-' + name].join('/'));
  }

  getManageLink() {
    let ifOwner = false;
    if (this._user.currentUser) {
      ifOwner = this._user.currentUser.extra.getObjects().indexOf(this.obj.id) > -1;
    }
    return ifOwner ? '/p/manageSupport' : this.getLink('manageRequest');
  }

  //gallery state change event listener
  stateChanged(image: number) {
    this.currentImage = image;
  }

  //set gallery current image
  openGallery(image) {
    this.currentImage = image;
  }

}
