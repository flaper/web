import {Component} from 'angular2/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";
import * as moment from 'moment';
import {StoryBestService} from "../../../../../services/story/StoryBestService";
import {StoryService} from "../../../../../services/story/StoryService";
import * as _ from 'lodash';

@Component({
  selector: 'top-stories',
  directives: [StoriesAutoList],
  pipes: [],
  template: require('./TopStories.html')
})
export class TopStories {
  where = null;
  winners = [];
  stories = null;

  constructor(storyBestService:StoryBestService, storyService:StoryService) {
    let minTime = moment.utc().startOf('week').subtract(7, 'days').toDate();
    this.where = {created: {gt: minTime}};
    storyBestService.getCurrentWinners().subscribe(data => {
      this.winners = data;
      let ids = data.map(row => row.id);
      if (ids.length) {
        storyService.get({where: {id: {inq: ids}}})
          .subscribe(stories => {
            this.stories = _.keyBy(stories, 'id');
          })
      }
    });
  }
}
