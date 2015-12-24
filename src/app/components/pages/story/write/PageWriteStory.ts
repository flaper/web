import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';
import {UserService} from "../../../../services/UserService";
import {SimpleWrite} from "../../../story/write/SimpleWrite/SimpleWrite";
import {Story} from "../../../../models/common/Story";
import {StoryService} from "../../../../services/StoryService";

@Component({
  selector: 'page-write-story',
  directives: [FORM_DIRECTIVES, SimpleWrite],
  pipes: [],
  styles: [require('./PageWriteStory.scss')],
  template: require('./PageWriteStory.html')
})
export class PageWriteStory {
  story:Story;
  newStory:boolean;

  constructor(private userService:UserService, private storyService:StoryService,
              private router:Router, routeParams:RouteParams) {
    if (!userService.currentUser) {
      router.navigate(['/Login']);
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
