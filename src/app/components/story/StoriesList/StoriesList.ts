/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {UserService} from "../../../services/UserService";
import {Story} from "../../../models/common/Story";
import {StoryItem} from "../StoryItem/StoryItem";
import {CommentService} from "../../../services/CommentService";
import {CommentsList} from "../../comment/CommentsList/CommentsList";
let _forOwn = require('lodash/forOwn');

import {LikeService} from "../../../services/LikeService";

@Component({
  selector: 'stories-list',
  directives: [StoryItem, CommentsList],
  styles: [require('./StoriesList.scss')],
  template: require('./StoriesList.html')
})
export class StoriesList {
  @Input()
  stories:Story[] = [];

  commentsGroupById = null;

  constructor(private commentService:CommentService, private likeService:LikeService,
              private userService:UserService) {
  }

  ngOnInit() {
    let usersIds = this.stories.map(story => story.userId);
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
        this.likeService.requestLikesInfo(commentsIds);
        this.userService.requestIds(usersIds);
      });
  }
}
