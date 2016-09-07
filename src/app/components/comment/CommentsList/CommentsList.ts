import {Component, Input} from '@angular/core';
import {Comment} from "@flaper/angular";
import {CommentComponent} from "../CommentComponent/CommentComponent";

@Component({
  selector: 'comments-list',
  entryComponents: [CommentComponent],
  styles: [require('./CommentsList.scss')],
  template: require('./CommentsList.html')
})
export class CommentsList {
  @Input()
  comments:Comment[] = [];

  constructor() {
  }
}
