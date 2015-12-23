/// <reference path="../../../../../../typingsOurs/main.d.ts" />

import {Component, Input, ViewChild} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouteParams} from 'angular2/router';
import {Story} from "../../../../models/common/Story";
import {StoryService} from "../../../../services/StoryService";
import {SimpleCreate} from "../../../story/create/SimpleCreate/SimpleCreate";
import {PageStory} from "../read/PageStory";

@Component({
  selector: 'layout-story',
  directives: [RouterOutlet, PageStory],
  pipes: [],
  styles: [require('./LayoutStory.scss')],
  template: require('./LayoutStory.html')
})
@RouteConfig([
  {path: '/', component: PageStory, name: 'View', useAsDefault: true},
  {path: '/edit', component: SimpleCreate, name: 'Edit'},
])
export class LayoutStory {
  @ViewChild(PageStory) viewChild:PageStory;
  story:Story;

  constructor(routeParams:RouteParams, private storyService:StoryService) {
    let slug = routeParams.params['slug'];
    this.storyService.getBySlug(slug).subscribe(story => {
      this.story = story;
      this.passStoryToChild();
    });
  }


  ngAfterViewInit() {
    this.passStoryToChild();
  }

  passStoryToChild() {
    if (this.viewChild && this.story) {
      this.viewChild.story = this.story;
    }
  }
}
