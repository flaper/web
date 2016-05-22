import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser"
import {RouteParams} from '@angular/router-deprecated';
import {UserService} from "flaper";
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
              pageService:PageService, routeParams:RouteParams, ts: Title) {
    if (!userService.currentUser) {
      pageService.navigateToLogin();
      return;
    } else {
      let slug = routeParams.params['slug'];
      let title = slug ? 'Редактировать статью': 'Создать статью';
      ts.setTitle(title);
      this.newStory = !slug;
      if (slug) {
        storyService.getBySlug(slug).subscribe(story => {
          this.story = story;
        });
      }
    }
  }
}
