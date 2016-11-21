import {Component, Input, SimpleChange} from '@angular/core';
import {Story, StoryService} from "@flaper/angular";

@Component({
  selector: 'stories-auto-list',
  styles: [require('./StoriesAutoList.scss')],
  template: require('./StoriesAutoList.html')
})
export class StoriesAutoList {
  @Input()
  where = {};
  @Input()
  order = "";
  @Input()
  exclude:Story[] = [];
  skip = 0;
  storiesGroup: Array<Story[]> = [];
  lastLength = 0;

  constructor(private storyService: StoryService) {
  }

  ngOnInit() {
    this.loadStoriesGroup(true);
  }
  alreadyShown(id){
    return !this.exclude.some(story => story.id.toString() === id.toString());
  }

  loadMore() {
    this.skip += this.storyService.LIMIT;
    this.loadStoriesGroup(false);
  }

  loading = false;

  loadStoriesGroup(isInitial: boolean) {

    this.loading = true; // to help change detector to see change later to false
    this.storyService.get({where: this.where, order: this.order, skip: this.skip}).subscribe((stories) => {
      stories = stories.filter(story => this.alreadyShown(story.id));
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
