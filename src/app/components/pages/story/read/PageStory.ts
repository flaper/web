/// <reference path="../../../../../../typingsOurs/main.d.ts" />

import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router'
import {Story} from "../../../../models/common/Story";
import {StoryComponent} from "../../../story/Story/StoryComponent";
import {StoryService} from "../../../../services/StoryService";

@Component({
  selector: 'page-story',
  directives: [StoryComponent],
  pipes: [],
  styles: [require('./PageStory.scss')],
  template: require('./PageStory.html')
})
export class PageStory {
  story:Story;

  constructor(routeParams:RouteParams, storyService:StoryService) {
    let slug = routeParams.params['slug'];
    storyService.getBySlug(slug).subscribe(story => {
      this.story = story;
    });
  }
}
