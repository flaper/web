import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {PageService} from "../../../../services/helpers/PageService";
import {Title} from "@angular/platform-browser"

@Component({
  selector: 'page-top-stories',
  directives: [LayoutHome],
  template: require('./PageLastStories.html')
})
export class PageLastStories {
  constructor(routeParams:RouteParams, pageService:PageService, ts:Title) {
    ts.setTitle('Флапер. Последние статьи');
    let remember = routeParams.get('remember');
    if (remember) {
      pageService.setDefault('Home')
    }
  }
}
