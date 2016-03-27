import {Component} from 'angular2/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";

@Component({
  selector: 'top-stories',
  directives: [StoriesAutoList],
  pipes: [],
  template: require('./TopStories.html')
})
export class TopStories {
}
