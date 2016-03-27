/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {UserService} from "../../../services/UserService";
import {Story} from "../../../models/common/Story";
import {StoryItem} from "../StoryItem/StoryItem";
import {CommentService} from "../../../services/CommentService";
import {CommentsList} from "../../comment/CommentsList/CommentsList";

@Component({
  selector: 'stories-list',
  directives: [StoryItem, CommentsList],
  styles: [require('./StoriesList.scss')],
  template: require('./StoriesList.html')
})
export class StoriesList {
  @Input()
  stories:Story[] = [];
  @Input()
  showAuthor:boolean = true;

  commentsGroupById = null;

  constructor(private commentService:CommentService) {
  }

  ngOnInit() {
    this.commentService.last(this.stories.map(story => story.id))
      .subscribe(groups => {
        this.commentsGroupById = groups
      });
  }
}
