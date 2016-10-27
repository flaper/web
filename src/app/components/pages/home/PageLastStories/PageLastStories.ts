import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../../../services/helpers/PageService";
import {Title} from "@angular/platform-browser"

@Component({
  selector: 'page-top-stories',
  template: require('./PageLastStories.html')
})
export class PageLastStories {
  constructor(route:ActivatedRoute, pageService:PageService, ts:Title) {
    ts.setTitle('Флапер. Последние статьи');
    let remember = route.snapshot.params['remember'];
    if (remember)
      pageService.setDefault('/')
  }
}
