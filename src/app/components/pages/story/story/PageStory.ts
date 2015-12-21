/// <reference path="../../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Story} from "../../../../models/common/Story";
import {StoryComponent} from "../../../story/Story/Story";
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

  constructor(routeParams:RouteParams, private storyService:StoryService) {
    let slug = routeParams.params['slug'];
    this.storyService.getBySlug(slug).subscribe(story => this.story = story);
  }
}
