/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {Comment} from "../../../models/common/Comment";
import {CommentComponent} from "../CommentComponent/CommentComponent";

@Component({
  selector: 'comments-list',
  directives: [CommentComponent],
  pipes: [],
  styles: [require('./CommentsList.scss')],
  template: require('./CommentsList.html')
})
export class CommentsList {
  @Input()
  comments:Comment[] = [];

  constructor() {
  }
}
