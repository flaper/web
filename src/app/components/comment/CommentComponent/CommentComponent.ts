import {Component, Input} from '@angular/core';
import {ACL, Comment, CommentService} from "@flaper/angular";
import {UserLink} from "../../user/UserLink/UserLink";
import {UserAvatar} from "../../user/UserAvatar/UserAvatar";
import {PostActions} from "../../post/PostActions/PostActions";
import {CommentWrite} from "../CommentWrite/CommentWrite";

@Component({
  selector: 'comment-component',
  directives: [UserLink, UserAvatar, PostActions, CommentWrite],
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
