import {Component} from '@angular/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";

@Component({
  selector: 'news',
  directives: [StoriesAutoList],
  pipes: [],
  template: require('./News.html')
})
export class News {
}
