import {Component} from '@angular/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {Title} from "@angular/platform-browser"

@Component({
  selector: 'page-top-stories',
  directives: [LayoutHome],
  template: require('./PageTopStories.html')
})
export class PageTopStories {
  constructor(ts:Title) {
    ts.setTitle('Лучшие статьи');
  }
}
