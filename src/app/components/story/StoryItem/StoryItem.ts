import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Story,FObject} from "@flaper/angular";
import {UserService,ObjectService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {RatingBar} from "../../common/Rating/RatingBar/RatingBar";

@Component({
  selector: 'story-item',
  entryComponents: [RatingBar],
  styles: [require('./StoryItem.scss')],
  template: require('./StoryItem.html')
})
export class StoryItem {
  @Input()
  story:Story;
  @Output()
  commentIt:EventEmitter<string> = new EventEmitter<string>();
  path:string[] = ['/s'];
  constructor(private userService:UserService, private pageService:PageService,
              private objectService:ObjectService) {
  }
  ngOnInit() {
    if (this.story.objectId)
      this.objectService.getById(this.story.objectId).subscribe(object => this.path = [object.mainDomain,object.region,object.slug]);
  }
  getRouterLink() {
    return [...this.path, this.story.slug];
  }
  onCommentIt() {
    if (!this.userService.currentUser) {
      this.pageService.navigateToLogin();
    } else {
      this.commentIt.emit(this.story.id);
    }
  }
}
