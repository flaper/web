import {Component, Input} from '@angular/core';
import {Comment} from "flaper";
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
