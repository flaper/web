import {Component} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';
import {Title} from "angular2/platform/browser"
import {ObjectService} from "../../../../services/object/ObjectService";
import {FObject} from "../../../../models/common/FObject";

@Component({
  selector: 'page-object',
  template: require('./PageObject.html'),
  styles: [require('./PageObject.scss')]
})
export class PageObject {
  obj:FObject;

  constructor(private ts:Title, routeParams:RouteParams, objectService:ObjectService, data:RouteData) {
    let mainDomain = routeParams.params['mainDomain'];
    mainDomain = mainDomain ? mainDomain : data.get('mainDomain');
    let region = routeParams.params['region'];
    let slug = routeParams.params['slug'];
    objectService.getBySlug({mainDomain, region, slug})
      .subscribe(data => {
        this.obj = data;
      });
  }
}
