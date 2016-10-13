import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Story,FObject} from "@flaper/angular";
import {UserService,ObjectService,StoryService} from "@flaper/angular";
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
  objectName:string = "";
  constructor(private userService:UserService, private pageService:PageService,
              private objectService:ObjectService) {
  }
  ngOnInit() {
    if (this.story.objectId)
      this.objectService.getById(this.story.objectId).subscribe(object => {
        this.path = ['/',object.mainDomain,object.region,object.slug].filter(item => !!item)
        this.objectName = object.title;
      });
  }
  getRouterLink() {
    let active = this.story.status === 'active';
    return [...this.path, (active? this.story.slug : this.story.id)];
  }
  isReview() {
    return !!this.story.objectId;
  }
  onCommentIt() {
    if (!this.userService.currentUser) {
      this.pageService.navigateToLogin();
    } else {
      this.commentIt.emit(this.story.id);
    }
  }
}
