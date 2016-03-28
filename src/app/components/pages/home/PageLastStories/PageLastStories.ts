import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {PageService} from "../../../../services/helpers/PageService";

@Component({
  selector: 'page-top-stories',
  directives: [LayoutHome],
  template: require('./PageLastStories.html')
})
export class PageLastStories {
  constructor(routeParams:RouteParams, pageService:PageService) {
    let remember = routeParams.get('remember');
    if (remember) {
      pageService.setDefault('Home')
    }
  }
}
