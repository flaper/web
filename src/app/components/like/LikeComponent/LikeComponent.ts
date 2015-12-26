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

  private ifIHaveLike = false;

  constructor(private likeService:LikeService, private userService:UserService) {

  }

  ngOnInit() {
    this.requestMyLike();
    this.userService.currentUserObservable.subscribe(() => this.requestMyLike());
  }

  requestMyLike() {
    if (this.userService.currentUser) {
      this.likeService.ifHasLikeObservable(this.subject.id)
        .subscribe(ifIHaveLike => this.ifIHaveLike = ifIHaveLike)
    }
  }

  toggleLike() {
    if (this.userService.currentUser && this.userService.currentUserId !== this.subject.userId) {
      this.likeService.toggle(this.subject.id)
        .subscribe((response) => {
          this.subject.numberOfLikes = response.count;
        })
    }
  }
}
