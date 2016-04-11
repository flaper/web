import {Component} from 'angular2/core';
import {Title} from "angular2/platform/browser"
import {StoriesAutoList} from "../../../story/StoriesAutoList/StoriesAutoList";
import * as moment from 'moment';
import {StoryBestService} from "../../../../services/story/StoryBestService";
import {StoryService} from "../../../../services/story/StoryService";
let _keyBy = require('lodash/keyBy');

@Component({
  selector: 'page-top-stories-last',
  directives: [StoriesAutoList],
  template: require('./PageTopStoriesLast.html')
})
export class PageTopStoriesLast {
  where = null;
  winners = [];
  stories = null;

  constructor(storyBestService:StoryBestService, storyService:StoryService, ts: Title) {
    ts.setTitle('Кандидаты на лучшие статьи');
    let maxTime = moment.utc().startOf('week').toDate();
    let minTime = moment.utc().startOf('week').subtract(14, 'days').toDate();
    storyBestService.getPreviousWinners(1).subscribe(data => {
      this.winners = data;
      let ids = data.map(row => row.id);
      this.where = {and: [{created: {gt: minTime, lt: maxTime}}, {id: {nin: ids}}]};
      if (ids.length) {
        storyService.get({where: {id: {inq: ids}}})
          .subscribe(stories => {
            this.stories = _keyBy(stories, 'id');
          })
      }
    });
  }
}
