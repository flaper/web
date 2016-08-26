import {Component, Input, SimpleChange} from '@angular/core';
import {Story, StoryService} from "@flaper/angular";
import {StoriesList} from "../StoriesList/StoriesList";
import {LoadMore} from "../../common/LoadMore/LoadMore";

@Component({
  selector: 'stories-auto-list',
  directives: [StoriesList, LoadMore],
  styles: [require('./StoriesAutoList.scss')],
  template: require('./StoriesAutoList.html')
})
export class StoriesAutoList {
  @Input()
  where = {};
  @Input()
  order = "";

  skip = 0;
  storiesGroup:Array<Story[]> = [];
  lastLength = 0;

  constructor(private storyService:StoryService) {
  }

  ngOnInit() {
    this.loadStoriesGroup(true);
  }


  loadMore() {
    console.log('loading more');
    this.skip += this.storyService.LIMIT;
    this.loadStoriesGroup(false);
  }

  loading = false;

  loadStoriesGroup(isInitial:boolean) {

    this.loading = true; // to help change detector to see change later to false
    this.storyService.get({where: this.where, order: this.order, skip: this.skip}).subscribe((stories) => {
      if (isInitial) {
        this.storiesGroup = [];
      }
      this.storiesGroup.push(stories);
      this.lastLength = stories.length;
      this.loading = false;
    })
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.loadStoriesGroup(true);
  }
}
