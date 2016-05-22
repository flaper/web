import {Component, Input} from '@angular/core';
import {ILikable} from "../../../models/common/ILikable";
import {LikeService} from "../../../services/LikeService";
import {UserService} from "flaper";
import {PageService} from "../../../services/helpers/PageService";

@Component({
  selector: 'like',
  template: require('./LikeComponent.html')
})
export class LikeComponent {
  @Input()
  subject:ILikable;

  @Input()
  iconMode:boolean = false;

  private ifIHaveLike = false;

  constructor(private likeService:LikeService, private userService:UserService, private pageService:PageService) {

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
    if (!this.userService.currentUser) {
      this.pageService.navigateToLogin();
    } else if (this.userService.currentUserId !== this.subject.userId) {
      this.likeService.toggle(this.subject.id)
        .subscribe((response) => {
          this.subject.likesNumber = response.count;
        })
    }
  }
}
