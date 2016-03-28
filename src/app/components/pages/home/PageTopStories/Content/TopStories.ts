import {Component} from 'angular2/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";
import * as moment from 'moment';

@Component({
  selector: 'top-stories',
  directives: [StoriesAutoList],
  pipes: [],
  template: require('./TopStories.html')
})
export class TopStories {
  where = null;

  constructor() {
    let minTime = moment.utc().startOf('week').subtract(7, 'days').toDate();
    this.where = {created: {gt: minTime}}
  }
}
