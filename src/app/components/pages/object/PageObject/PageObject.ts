import {Component} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';
import {Title} from "angular2/platform/browser"
import {ObjectService} from "../../../../services/object/ObjectService";
import {FObject} from "../../../../models/common/FObject";
import {ScreenService} from "../../../../services/helpers/ScreenService";

@Component({
  selector: 'page-object',
  template: require('./PageObject.html'),
  styles: [require('./PageObject.scss')]
})
export class PageObject {
  obj:FObject;
  images;

  constructor(ts:Title, routeParams:RouteParams, _object:ObjectService, data:RouteData) {
    let mainDomain = routeParams.params['mainDomain'];
    mainDomain = mainDomain ? mainDomain : data.get('mainDomain');
    let region = routeParams.params['region'];
    let slug = routeParams.params['slug'];
    _object.getBySlug({mainDomain, region, slug})
      .subscribe(fobject => {
        this.obj = fobject;
        ts.setTitle(fobject.title);
        let imagesLimit = ScreenService.isXl() ? 6 : 4;
        this.images = fobject.flap.images.slice(0, imagesLimit);
      });
  }
}
