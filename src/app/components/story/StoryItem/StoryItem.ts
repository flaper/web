import {Component, Input} from 'angular2/core';
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
  @Input()
  showAuthor:boolean = true;

  constructor() {
  }
}
