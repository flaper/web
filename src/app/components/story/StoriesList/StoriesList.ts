import {Component, Input} from '@angular/core';
import {UserService, CommentService, Story, LikeService, ObjectService} from "@flaper/angular";
import {StoryItem} from "../StoryItem/StoryItem";
import {CommentsList} from "../../comment/CommentsList/CommentsList";
import {CommentsShortList} from "../../comment/CommentsShortList/CommentsShortList";
let _forOwn = require('lodash/forOwn');
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'stories-list',
  entryComponents: [StoryItem, CommentsShortList],
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
              private userService:UserService, private objectService:ObjectService) {
  }

  ngOnInit() {
    let usersIds = this.stories.map(story => story.id),
        objectIds = this.stories.map(story => story.objectId).filter(id => !!id);
    // this.objectService.requestIds(objectIds);
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
            usersIds.push(comment.id);
          })
        });
        //noinspection TypeScriptUnresolvedFunction
        this._like.requestLikesInfo(commentsIds);
        this.userService.requestIds(usersIds);
      });
  }
  getObject(id:string) {
    return this.objectService.getById(id);
  }
  onCommentIt(id) {
    this.commentItActive[id] = true;
    this.commentItEvents[id].next(true);
  }
}
