import {Component} from 'angular2/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";

@Component({
  selector: 'news',
  directives: [StoriesAutoList],
  pipes: [],
  template: require('./News.html')
})
export class News {
}
