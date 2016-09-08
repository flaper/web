import {Component, Input} from '@angular/core';
import {Comment, CommentService} from "@flaper/angular";
import {CommentsList} from "../CommentsList/CommentsList";
import {CommentWrite} from "../CommentWrite/CommentWrite";
import {UserService} from "@flaper/angular";

@Component({
  selector: 'comments-auto-list',
  entryComponents: [CommentsList, CommentWrite],
  styles: [require('./CommentsAutoList.scss')],
  template: require('./CommentsAutoList.html')
})
export class CommentsAutoList {
  @Input()
  subjectId;

  comments:Comment[] = [];

  //at least one time comments were loaded
  wasLoaded:boolean = false;

  constructor(private commentService:CommentService, private _user:UserService) {
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

  ngOnChanges(changes) {
    if (changes.subjectId) {
      this.reloadComments();
    }
  }
}
