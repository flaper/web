import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser"
import {ActivatedRoute} from '@angular/router';
import {StoryService, UserService} from "@flaper/angular";
import {SimpleWrite} from "../../../story/write/SimpleWrite/SimpleWrite";
import {Story} from "@flaper/angular";
import {PageService} from "../../../../services/helpers/PageService";

@Component({
  selector: 'page-write-story',
  entryComponents: [SimpleWrite],
  styles: [require('./PageWriteStory.scss')],
  template: require('./PageWriteStory.html')
})
export class PageWriteStory {
  story:Story;
  newStory:boolean;

  constructor(userService:UserService, storyService:StoryService,
              pageService:PageService, route:ActivatedRoute, ts:Title) {
    if (!userService.currentUser) {
      pageService.navigateToLogin();
      return;
    } else {
      let params = route.snapshot.params;
      let slug = params['slug'];
      let title = slug ? 'Редактировать статью' : 'Создать статью';
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
