import {Component} from 'angular2/core';
import {Router, RouteConfig, RouteParams, RouteData} from 'angular2/router';
import {Title} from "angular2/platform/browser"
import {ObjectService} from "../../../../services/object/ObjectService";
import {FObject} from "../../../../models/common/FObject";
import {PageObjectMain} from "../PageObjectMain/PageObjectMain";
import {PageManageRequest} from "../PageManageRequest/PageManageRequest";

@Component({
  selector: 'lyout-object',
  template: require('./LayoutObject.html'),
  styles: [require('./LayoutObject.scss')]
})
@RouteConfig([
  {path: '/', name: 'Main', component: PageObjectMain, useAsDefault: true},
  {path: '/request', name: 'ManageRequest', component: PageManageRequest},
])
export class LayoutObject {
  static Object:FObject;
  obj:FObject;

  constructor(ts:Title, routeParams:RouteParams, _object:ObjectService, data:RouteData,
              private router:Router) {
    let mainDomain = routeParams.params['mainDomain'];
    mainDomain = mainDomain ? mainDomain : data.get('mainDomain');
    let region = routeParams.params['region'];
    let slug = routeParams.params['slug'];
    _object.getBySlug({mainDomain, region, slug})
      .subscribe(fobject => {
        this.obj = fobject;
        LayoutObject.Object = fobject;
        ts.setTitle(fobject.title);
      });
    router.subscribe(data => {
      console.log('new route');
      console.log(data);
    })
  }

  isMain() {
    let instruction = this.router.generate(['Main']);
    return this.router.isRouteActive(instruction);
  }
}