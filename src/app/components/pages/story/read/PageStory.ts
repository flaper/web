import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Story, StoryService} from "@flaper/angular";
import {StoryComponent} from "../../../story/StoryComponent/StoryComponent";
import {CommentsAutoList} from "../../../comment/CommentsAutoList/CommentsAutoList";
import {Title} from "@angular/platform-browser"
import {Metrika} from "../../../../services/metrics/Metrika";

@Component({
  selector: 'page-story',
  entryComponents: [StoryComponent, CommentsAutoList],
  styles: [require('./PageStory.scss')],
  template: require('./PageStory.html')
})
export class PageStory {
  story:Story;

  constructor(route:ActivatedRoute, storyService:StoryService, ts:Title) {
    route.params.subscribe(params=> {
      let slug = params['reviewSlug'] ? params['reviewSlug'] : params['slug'],
          beforeSlug = params['reviewSlug']
          ? window.location.pathname.split('/').filter(val => !!val && val != slug).slice(0,3).join("/")
          : "" ;
      beforeSlug = decodeURIComponent(beforeSlug);
      storyService.getBySlug(slug,beforeSlug).subscribe(story => {
        this.story = story;
        ts.setTitle(story.title);
        Metrika.setParam('storyId', story.id);
        Metrika.setParam('authorId', story.id);
      });
    });
  }
}
