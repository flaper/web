/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {Comment} from "../../../models/common/Comment";
import {UserLink} from "../../user/UserLink/UserLink";
import {UserAvatar} from "../../user/UserAvatar/UserAvatar";
import {TimeAgoPipe} from 'angular2-moment';
import {LikeComponent} from "../../like/LikeComponent/LikeComponent";
import {PostActions} from "../../post/PostActions/PostActions";
import {CommentService} from "../../../services/CommentService";
import {ACL} from "../../../acl/ACL";
import {CommentWrite} from "../CommentWrite/CommentWrite";

@Component({
  selector: 'comment-component',
  directives: [UserLink, UserAvatar, LikeComponent, PostActions, CommentWrite],
  pipes: [TimeAgoPipe],
  styles: [require('./CommentComponent.scss')],
  template: require('./CommentComponent.html')
})
export class CommentComponent {
  avatarSize = UserAvatar.SIZE.MINOR;
  @Input()
  comment:Comment;

  private actions = [
    {name: 'update', title: 'Изменить', icon: 'fa-pencil', acl: 'Comment.write'},
    {name: 'delete', title: 'Удалить', icon: 'fa-ban', acl: 'Comment.write'},
  ];

  private updateMode = false;

  constructor(private commentService:CommentService, private acl:ACL) {
  }

  actionEvent(event) {
    switch (event) {
      case 'delete':
        if (confirm('Вы уверены, что хотите удалить комментарий?')) {
          this.commentService.del(this.comment.id);
          this.comment = null;
        }
        break;
      case 'update':
        this.updateMode = !this.updateMode;
        break;
      default:
        throw `Unsupported event ${event}`;
    }
  }

  commentSaved() {
    this.updateMode = false;
  }
}
