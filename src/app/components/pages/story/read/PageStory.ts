import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated'
import {Story, StoryService} from "flaper";
import {StoryComponent} from "../../../story/StoryComponent/StoryComponent";
import {CommentsAutoList} from "../../../comment/CommentsAutoList/CommentsAutoList";
import {Title} from "@angular/platform-browser"
import {Metrika} from "../../../../services/metrics/Metrika";

@Component({
  selector: 'page-story',
  directives: [StoryComponent, CommentsAutoList],
  styles: [require('./PageStory.scss')],
  template: require('./PageStory.html')
})
export class PageStory {
  story:Story;

  constructor(routeParams:RouteParams, storyService:StoryService, ts:Title) {
    let slug = routeParams.params['slug'];
    storyService.getBySlug(slug).subscribe(story => {
      this.story = story;
      ts.setTitle(story.title);
      Metrika.setParam('storyId', story.id);
      Metrika.setParam('authorId', story.userId);
    });
  }
}
