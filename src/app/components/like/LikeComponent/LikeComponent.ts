/// <reference path="../../../../../typingsOurs/main.d.ts" />
import {Component, Input} from 'angular2/core';
import {ILikable} from "../../../models/common/ILikable";
import {LikeService} from "../../../services/LikeService";
import {UserService} from "../../../services/UserService";

@Component({
  selector: 'like',
  template: require('./LikeComponent.html')
})
export class LikeComponent {
  @Input()
  subject:ILikable;

  constructor(private likeService:LikeService, private userService:UserService) {
  }

  toggleLike() {
    if (this.userService.currentUser) {
      this.likeService.toggle(this.subject.id)
        .subscribe((response) => {
          this.subject.numberOfLikes = response.count;
        })
    }
  }
}
