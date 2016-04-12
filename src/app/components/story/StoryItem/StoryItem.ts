import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Story} from "../../../models/common/Story";
import {UserLink} from "../../user/UserLink/UserLink";
import {UserAvatar} from "../../user/UserAvatar/UserAvatar";

@Component({
  selector: 'story-item',
  directives: [UserLink, UserAvatar],
  styles: [require('./StoryItem.scss')],
  template: require('./StoryItem.html')
})
export class StoryItem {
  @Input()
  story:Story;
  @Output()
  commentIt:EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  onCommentIt() {
    this.commentIt.emit(this.story.id);
  }
}
