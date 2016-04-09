import {Component} from 'angular2/core';
import {StoriesAutoList} from "../../../story/StoriesAutoList/StoriesAutoList";
import * as moment from 'moment';
import {StoryBestService} from "../../../../services/story/StoryBestService";
import {StoryService} from "../../../../services/story/StoryService";
import * as _ from 'lodash';

@Component({
  selector: 'page-top-stories-last',
  directives: [StoriesAutoList],
  template: require('./PageTopStoriesLast.html')
})
export class PageTopStoriesLast {
  where = null;
  winners = [];
  stories = null;

  constructor(storyBestService:StoryBestService, storyService:StoryService) {
    let maxTime = moment.utc().startOf('week').toDate();
    let minTime = moment.utc().startOf('week').subtract(14, 'days').toDate();
    storyBestService.getCurrentWinners().subscribe(data => {
      this.winners = data;
      let ids = data.map(row => row.id);
      this.where = {and: [{created: {gt: minTime, lt: maxTime}}, {id: {nin: ids}}]};
      if (ids.length) {
        storyService.get({where: {id: {inq: ids}}})
          .subscribe(stories => {
            this.stories = _.keyBy(stories, 'id');
          })
      }
    });
  }
}