import {Component, Input} from '@angular/core';
import {Comment} from "../../../models/common/Comment";
import {CommentsList} from "../CommentsList/CommentsList";
import {CommentService} from "../../../services/CommentService";
import {CommentWrite} from "../CommentWrite/CommentWrite";
import {UserService} from "flaper";

@Component({
  selector: 'comments-auto-list',
  directives: [CommentsList, CommentWrite],
  styles: [require('./CommentsAutoList.scss')],
  template: require('./CommentsAutoList.html')
})
export class CommentsAutoList {
  @Input()
  subjectId;

  comments:Comment[] = [];

  //at least one time comments were loaded
  wasLoaded:boolean = false;

  constructor(private commentService:CommentService, private userService:UserService) {
  }

  ngOnInit() {
    this.reloadComments();
  }

  commentAdded(comment) {
    this.comments.unshift(comment);
    this.reloadComments();
  }

  reloadComments() {
    this.commentService.getBySubjectId(this.subjectId).subscribe((comments) => {
      this.comments = comments;
      this.wasLoaded = true;
    })
  }
}
