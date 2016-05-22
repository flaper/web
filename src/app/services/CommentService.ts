import {Injectable} from '@angular/core';
import {ApiService} from 'flaper';
import {LikeService} from "./LikeService";
import {UserService} from "flaper";

@Injectable()
export class CommentService {
  constructor(private api:ApiService, private likeService:LikeService, private userService:UserService) {
  }

  getBySubjectId(subjectId) {
    if (!subjectId) throw 'Comment.getBySubjectId - subjectId required';
    return this.api.request('get', 'comments', {filter: JSON.stringify({where: {subjectId: subjectId}})})
      .do((data) => {
        //we need to know if current user able to add a "like"
        this.likeService.requestLikesInfo(data.map(model => model.id));
        this.userService.requestIds(data.map(model => model.userId));
      });
  }

  last(subjectIds) {
    return this.api.request('get', 'comments/last', {ids: JSON.stringify(subjectIds)});
  }

  post(data) {
    return this.api.request('post', 'comments', data);
  }

  put(data) {
    return this.api.request('put', `comments/${data.id}`, data);
  }

  save(data) {
    return data.id ? this.put(data) : this.post(data);
  }

  del(subjectId) {
    if (!subjectId) throw 'Comment.del - subjectId required';
    return this.api.request('delete', `comments/${subjectId}`).publishLast().connect();
  }
}

export let COMMENT_SERVICE_PROVIDER = [CommentService];
