import {Component} from 'angular2/core';
import {FObject} from "../../../../models/common/FObject";
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

  constructor() {
    this.obj = LayoutObject.Object;
    let imagesLimit = ScreenService.isXl() ? 6 : 4;
    this.images = this.obj.getImages({filterAvatar: true}).slice(0, imagesLimit);
  }
}