import {Component, Input} from '@angular/core';
import {Comment, CommentService, UserService, ICommentable} from "@flaper/angular";

const MAX_RECENT_SIZE = 4;
@Component({
  selector: 'comments-short-list',
  styles: [require('./CommentsShortList.scss')],
  template: require('./CommentsShortList.html')
})
export class CommentsShortList {
  @Input()
  subject: ICommentable;

  @Input()
  recentCommentsInput: Comment[] = [];//to use only during initialization

  @Input()
  commentItObservable;

  recentComments: Comment[] = [];

  previousComments: Comment[] = [];

  previousCommentsNumber = 0;
  previousOpened: boolean = false;

  constructor(private commentService: CommentService, private userService: UserService) {
  }

  ngOnInit() {
    this.recentComments = this.recentCommentsInput.slice(0);
    this.previousCommentsNumber = Math.max(0, this.subject.commentsNumber - this.recentComments.length);
  }

  showPreviousComments() {
    this.previousOpened = true;
    this.reloadComments();
  }

  hidePreviousComments() {
    this.previousOpened = false;
  }

  commentAdded(comment) {
    this.recentComments.push(comment);
    this.recentComments = this.recentComments.slice(this.recentComments.length - MAX_RECENT_SIZE,
      this.recentComments.length);
    this.reloadComments();
  }

  reloadComments() {
    this.commentService.getBySubjectId(this.subject.id).subscribe((comments) => {
      this.subject.commentsNumber = comments.length;
      let recentNumber = Math.max(this.recentComments.length, 3);
      recentNumber = Math.min(recentNumber, MAX_RECENT_SIZE);
      this.recentComments = comments.slice(0, recentNumber).reverse();
      this.previousCommentsNumber = comments.length - this.recentComments.length;
      this.previousComments = comments.slice(recentNumber).reverse();
    })
  }

}
