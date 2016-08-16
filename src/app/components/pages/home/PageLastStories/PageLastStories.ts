import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {PageService} from "../../../../services/helpers/PageService";
import {Title} from "@angular/platform-browser"

@Component({
  selector: 'page-top-stories',
  directives: [LayoutHome],
  template: require('./PageLastStories.html')
})
export class PageLastStories {
  constructor(route:ActivatedRoute, pageService:PageService, ts:Title) {
    ts.setTitle('Флапер. Последние статьи');
    /* @todo @stanislav to update after new router
     route.params.subscribe(params => {
     let remember = routeParams.get('remember');
     if (remember) {
     pageService.setDefault('/')
     }
     });
     */
  }
}
