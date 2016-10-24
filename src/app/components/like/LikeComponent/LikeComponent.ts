import {Component, Input} from '@angular/core';
import {ILikable, UserService, LikeService} from "@flaper/angular";
import {PageService} from "../../../services/helpers/PageService";
import {PopupService} from "../../../services/popup/PopupService";
import {Navbar} from "../../layout/navbar/navbar";
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

  constructor(private _like:LikeService, private _user:UserService, private _page:PageService, private _popup:PopupService) {

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
  showPopup() {
    this._popup.openPopup("like","<navbar></navbar>");
  }
  toggleLike() {
    if (!this._user.currentUser) {
      this._page.navigateToLogin();
    } else if (this._user.currentUserId !== this.subject.userId) {
      this._like.toggle(this.subject.id)
        .subscribe((response) => {
          this.subject.likesNumber = response.count;
        })
    }
  }
  ngOnChanges(changes) {
    if (changes.subject) {
      this.requestMyLike();
      //noinspection TypeScriptUnresolvedFunction
      this._user.currentUserObservable.subscribe(() => this.requestMyLike());
    }
  }
}
