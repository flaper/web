import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser"

@Component({
  selector: 'page-top-stories',
  template: require('./PageTopStories.html')
})
export class PageTopStories {
  constructor(ts:Title) {
    ts.setTitle('Лучшие статьи');
  }
}
