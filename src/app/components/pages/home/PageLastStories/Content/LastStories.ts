import {Component} from '@angular/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";

@Component({
  selector: 'last-stories',
  directives: [StoriesAutoList],
  pipes: [],
  template: require('./LastStories.html')
})
export class LastStories {
}
