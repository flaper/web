import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router'
import {Story} from "../../../../models/common/Story";
import {StoryComponent} from "../../../story/StoryComponent/StoryComponent";
import {StoryService} from "../../../../services/story/StoryService";
import {CommentsAutoList} from "../../../comment/CommentsAutoList/CommentsAutoList";

@Component({
  selector: 'page-story',
  directives: [StoryComponent, CommentsAutoList],
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
