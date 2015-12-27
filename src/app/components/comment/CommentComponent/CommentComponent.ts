/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {Comment} from "../../../models/common/Comment";
import {UserLink} from "../../user/UserLink/UserLink";
import {UserAvatar} from "../../user/UserAvatar/UserAvatar";
import {TimeAgoPipe} from 'angular2-moment';
import {LikeComponent} from "../../like/LikeComponent/LikeComponent";
import {PostActions} from "../../post/PostActions/PostActions";
import {CommentService} from "../../../services/CommentService";

@Component({
  selector: 'comment-component',
  directives: [UserLink, UserAvatar, LikeComponent, PostActions],
  pipes: [TimeAgoPipe],
  styles: [require('./CommentComponent.scss')],
  template: require('./CommentComponent.html')
})
export class CommentComponent {
  avatarSize = UserAvatar.SIZE.MINOR;
  @Input()
  comment:Comment;

  constructor(private commentService:CommentService) {
  }

  actionEvent(event) {
    this.commentService.del(this.comment.id);
    this.comment = null;
  }
}
