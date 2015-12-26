/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {Comment} from "../../../models/common/Comment";
import {UserLink} from "../../user/UserLink/UserLink";
import {TimeAgoPipe} from 'angular2-moment';
import {LikeComponent} from "../../like/LikeComponent/LikeComponent";

@Component({
  selector: 'comment-component',
  directives: [UserLink, LikeComponent],
  pipes: [TimeAgoPipe],
  styles: [require('./CommentComponent.scss')],
  template: require('./CommentComponent.html')
})
export class CommentComponent {
  @Input()
  comment:Comment;

  constructor() {
  }
}
