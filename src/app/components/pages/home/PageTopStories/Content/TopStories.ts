import {Component} from '@angular/core';
import * as moment from 'moment';
import {StoryService, StoryBestService} from "@flaper/angular";
let _keyBy = require('lodash/keyBy');

@Component({
  selector: 'top-stories',
  styles: [require('./TopStories.scss')],
  template: require('./TopStories.html')
})
export class TopStories {
  where = null;
  winners = [];
  stories = null;

  constructor(storyBestService: StoryBestService, storyService: StoryService) {
    let minTime = moment.utc().startOf('week').subtract(7, 'days').toDate();
    storyBestService.getCurrentWinners().subscribe(data => {
      this.winners = data;
      let ids = data.map(row => row.id);
      this.where = {and: [{created: {gt: minTime}}, {id: {nin: ids}}]};
      if (ids.length) {
        storyService.get({where: {id: {inq: ids}}})
          .subscribe(stories => {
            this.stories = _keyBy(stories, 'id');
          })
      }
    });
  }
}
