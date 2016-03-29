import {Injectable} from 'angular2/core';
import {ApiService} from "./ApiService";
import {UserService} from "./UserService";
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
    if (!this._myLikes[id]) {
      this._myLikes[id] = new Rx.BehaviorSubject(false);

      let where = {subjectId: id, userId: this.userService.currentUserId};
      this.api.request('get', 'likes/count', {where: JSON.stringify(where)})
        .subscribe(result => this._myLikes[id].next(!!result.count));
    }
    return this._myLikes[id];
  }

  requestLikesInfo(allIds) {
    let ids = allIds.filter(id => !this._myLikes[id]);
    if (ids.length > 0) {
      ids.forEach((id) => {
        this._myLikes[id] = new Rx.BehaviorSubject(false);
      });

      //let's request for allIds to update cache if we need at least one
      let where = {userId: this.userService.currentUserId, subjectId: {inq: allIds}};
      let filter = {where: where};
      this.api.request('get', 'likes', {filter: JSON.stringify(filter)})
        .subscribe(likes => {
          likes.forEach(like => this._myLikes[like.subjectId].next(true));
        })
    }
  }

  toggle(subjectId) {
    let ob = this._myLikes[subjectId];
    if (ob) {
      ob.next(!ob.getValue());
    }
    return this.api.request('post', `likes/toggle/${subjectId}`);
  }
}

export let LIKE_SERVICE_PROVIDER = [LikeService];
