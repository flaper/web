import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {DefaultPageService} from "../../../../services/helpers/DefaultPageService";

@Component({
  selector: 'page-top-stories',
  directives: [LayoutHome],
  template: require('./PageLastStories.html')
})
export class PageLastStories {
  constructor(routeParams:RouteParams, defaultPage:DefaultPageService) {
    let remember = routeParams.get('remember');
    if (remember){
      defaultPage.set('Home')
    }
  }
}
