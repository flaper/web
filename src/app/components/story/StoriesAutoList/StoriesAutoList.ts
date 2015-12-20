import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {UserService} from "../../../services/UserService";
import {Story} from "../../../models/common/Story";
import {StoriesList} from "../StoriesList/StoriesList";
import {StoryService} from "../../../services/StoryService";

@Component({
  selector: 'stories-auto-list',
  directives: [FORM_DIRECTIVES, StoriesList],
  pipes: [],
  styles: [require('./StoriesAutoList.scss')],
  template: require('./StoriesAutoList.html')
})
export class StoriesAutoList {
  stories:Story[] = [];

  constructor(private storyService:StoryService) {
    this.storyService.get().subscribe((stories) => {
      this.stories = stories;
    })
  }
}
