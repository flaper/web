import {Injectable} from '@angular/core';
import {ApiService} from 'flaper';
import {UserService} from "flaper";
import * as Rx from 'rxjs';

@Injectable()
export class LikeService {
  constructor(private api:ApiService, private userService:UserService) {
    userService.currentUserObservable.subscribe(() => {
      this._myLikes = new Map<string, Rx.BehaviorSubject<boolean>>();
    })
  }

  //cache map
  private _myLikes:Map<string, Rx.BehaviorSubject<boolean>> = new Map<string, Rx.BehaviorSubject<boolean>>();

  /**
   *
   * @param id - subjectId
   * @returns {any}
   */
  ifHasLikeObservable(id) {
    if (!this._myLikes.has(id)) {
      this._myLikes.set(id, new Rx.BehaviorSubject(false));

      let where = {subjectId: id, userId: this.userService.currentUserId};
      this.api.request('get', 'likes/count', {where: JSON.stringify(where)})
        .subscribe(result => this._myLikes.get(id).next(!!result.count));
    }
    return this._myLikes.get(id);
  }

  requestLikesInfo(allIds) {
    let ids = allIds.filter(id => !this._myLikes.has(id));
    if (ids.length > 0) {
      ids.forEach((id) => {
        this._myLikes.set(id, new Rx.BehaviorSubject(false));
      });

      //let's request for allIds to update cache if we need at least one
      let where = {userId: this.userService.currentUserId, subjectId: {inq: allIds}};
      let filter = {where: where};
      this.api.request('get', 'likes', {filter: JSON.stringify(filter)})
        .subscribe(likes => {
          likes.forEach(like => this._myLikes.get(like.subjectId).next(true));
        })
    }
  }

  toggle(subjectId) {
    let ob = this._myLikes.get(subjectId);
    if (ob) {
      ob.next(!ob.getValue());
    }
    return this.api.request('post', `likes/toggle/${subjectId}`);
  }
}

export let LIKE_SERVICE_PROVIDER = [LikeService];
