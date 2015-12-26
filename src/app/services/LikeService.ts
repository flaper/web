import {Injectable} from 'angular2/core';
import {ApiService} from "./ApiService";
import {UserService} from "./UserService";

@Injectable()
export class LikeService {
  constructor(private api:ApiService, private userService:UserService) {
  }

  getBySubjectId(subjectId) {
    if (!subjectId) throw 'Comment.getBySubjectId - subjectId required';
    return this.api.request('get', 'comments', {filter: JSON.stringify({where: {subjectId: subjectId}})});
  }

  toggle(subjectId) {
    return this.api.request('post', `likes/toggle/${subjectId}`);
  }
}

export let LIKE_SERVICE_PROVIDER = [LikeService];
