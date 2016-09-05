import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Story} from "@flaper/angular";
import {UserService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {RatingBar} from "../../common/Rating/RatingBar/RatingBar";

@Component({
  selector: 'story-item',
  directives: [RatingBar],
  styles: [require('./StoryItem.scss')],
  template: require('./StoryItem.html')
})
export class StoryItem {
  @Input()
  story:Story;
  @Output()
  commentIt:EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService:UserService, private pageService:PageService) {
  }

  onCommentIt() {
    if (!this.userService.currentUser) {
      this.pageService.navigateToLogin();
    } else {
      this.commentIt.emit(this.story.id);
    }
  }
}
