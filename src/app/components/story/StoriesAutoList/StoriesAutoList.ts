import {Component, Input} from 'angular2/core';
import {Story} from "../../../models/common/Story";
import {StoriesList} from "../StoriesList/StoriesList";
import {StoryService} from "../../../services/story/StoryService";
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

  @Input()
  showAuthor:boolean = true;

  skip = 0;
  storiesGroup:Array<Story[]> = [];
  lastLength = 0;

  constructor(private storyService:StoryService) {
  }

  ngOnInit() {
    this.loadStoriesGroup();
  }


  loadMore() {
    this.skip += this.storyService.LIMIT;
    this.loadStoriesGroup();
  }

  loading = false;

  loadStoriesGroup() {
    this.loading = true; // to help change detector to see change later to false
    this.storyService.get({where: this.where, order: this.order, skip: this.skip}).subscribe((stories) => {
      this.storiesGroup.push(stories);
      this.lastLength = stories.length;
      this.loading = false;
    })
  }
}
