import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
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
  @Input()
  where = {};
  @Input()
  order = "";

  @Input()
  showAuthor:boolean = true;

  stories:Story[] = [];

  constructor(private storyService:StoryService) {
  }

  ngOnInit() {
    this.storyService.get({where: this.where, order: this.order}).subscribe((stories) => {
      this.stories = stories;
    })
  }
}
