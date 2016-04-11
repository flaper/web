import {Component} from 'angular2/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {Title} from "angular2/platform/browser"

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
