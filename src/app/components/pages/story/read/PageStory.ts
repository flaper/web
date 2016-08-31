import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Story, StoryService} from "@flaper/angular";
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

  constructor(route:ActivatedRoute, storyService:StoryService, ts:Title) {
    let params = route.snapshot.params;
    let slug = params['slug'];
    storyService.getBySlug(slug).subscribe(story => {
      this.story = story;
      console.log(story);
      ts.setTitle(story.title);
      Metrika.setParam('storyId', story.id);
      Metrika.setParam('authorId', story.id);
    });
  }
}
