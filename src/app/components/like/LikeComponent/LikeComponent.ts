import {Component, Input} from '@angular/core';
import {ILikable, UserService, LikeService} from "flaper";
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

  constructor(private _like:LikeService, private _user:UserService, private pageService:PageService) {

  }

  ngOnInit() {
    this.requestMyLike();
    //noinspection TypeScriptUnresolvedFunction
    this._user.currentUserObservable.subscribe(() => this.requestMyLike());
  }

  requestMyLike() {
    if (this._user.currentUser) {
      this._like.ifHasLikeObservable(this.subject.id)
        .subscribe(ifIHaveLike => this.ifIHaveLike = ifIHaveLike)
    }
  }

  toggleLike() {
    if (!this._user.currentUser) {
      this.pageService.navigateToLogin();
    } else if (this._user.currentUserId !== this.subject.userId) {
      this._like.toggle(this.subject.id)
        .subscribe((response) => {
          this.subject.likesNumber = response.count;
        })
    }
  }
}
