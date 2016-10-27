import {Component, Input} from '@angular/core';
import {Comment} from "@flaper/angular";

@Component({
  selector: 'comments-list',
  styles: [require('./CommentsList.scss')],
  template: require('./CommentsList.html')
})
export class CommentsList {
  @Input()
  comments: Comment[] = [];

  constructor() {
  }
}
