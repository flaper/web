/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {Comment} from "../../../models/common/Comment";
import {UserLink} from "../../user/UserLink/UserLink";
import {TimeAgoPipe} from 'angular2-moment';

@Component({
  selector: 'comment-component',
  directives: [UserLink],
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
