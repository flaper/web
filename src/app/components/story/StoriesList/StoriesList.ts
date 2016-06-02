import {Component, Input} from '@angular/core';
import {UserService, CommentService, Story, LikeService} from "flaper";
import {StoryItem} from "../StoryItem/StoryItem";
import {CommentsList} from "../../comment/CommentsList/CommentsList";
import {CommentsShortList} from "../../comment/CommentsShortList/CommentsShortList";
let _forOwn = require('lodash/forOwn');
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'stories-list',
  directives: [StoryItem, CommentsShortList],
  styles: [require('./StoriesList.scss')],
  template: require('./StoriesList.html')
})
export class StoriesList {
  @Input()
  stories:Story[] = [];

  commentsGroupById = null;
  commentItEvents = {};
  commentItActive = {};

  constructor(private commentService:CommentService, private _like:LikeService,
              private userService:UserService) {
  }

  ngOnInit() {
    let usersIds = this.stories.map(story => story.userId);
    this.stories.forEach(story => this.commentItEvents[story.id] = new ReplaySubject<boolean>(1));
    this.userService.requestIds(usersIds);
    this.commentService.last(this.stories.map(story => story.id))
      .subscribe(groups => {
        let commentsIds = [];
        let usersIds = [];
        this.commentsGroupById = groups;
        _forOwn(groups, group => {
          group.forEach(comment => {
            commentsIds.push(comment.id);
            usersIds.push(comment.userId);
          })
        });
        //noinspection TypeScriptUnresolvedFunction
        this._like.requestLikesInfo(commentsIds);
        this.userService.requestIds(usersIds);
      });
  }

  onCommentIt(id) {
    this.commentItActive[id] = true;
    this.commentItEvents[id].next(true);
  }
}
