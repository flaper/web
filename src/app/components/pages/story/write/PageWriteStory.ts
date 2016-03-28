import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {UserService} from "../../../../services/UserService";
import {SimpleWrite} from "../../../story/write/SimpleWrite/SimpleWrite";
import {Story} from "../../../../models/common/Story";
import {StoryService} from "../../../../services/story/StoryService";
import {PageService} from "../../../../services/helpers/PageService";

@Component({
  selector: 'page-write-story',
  directives: [SimpleWrite],
  styles: [require('./PageWriteStory.scss')],
  template: require('./PageWriteStory.html')
})
export class PageWriteStory {
  story:Story;
  newStory:boolean;

  constructor(userService:UserService, storyService:StoryService,
              pageService:PageService, routeParams:RouteParams) {
    if (!userService.currentUser) {
      pageService.navigateToLogin();
      return;
    } else {
      let slug = routeParams.params['slug'];
      this.newStory = !slug;
      if (slug) {
        storyService.getBySlug(slug).subscribe(story => {
          this.story = story;
        });
      }
    }
  }
}
