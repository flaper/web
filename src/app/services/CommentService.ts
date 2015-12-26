import {Injectable} from 'angular2/core';
import {ApiService} from "./ApiService";
import {LikeService} from "./LikeService";

@Injectable()
export class CommentService {
  constructor(private api:ApiService, private likeService:LikeService) {
  }

  getBySubjectId(subjectId) {
    if (!subjectId) throw 'Comment.getBySubjectId - subjectId required';
    return this.api.request('get', 'comments', {filter: JSON.stringify({where: {subjectId: subjectId}})})
      .do((data) => {
        this.likeService.requestLikesInfo(data.map(model => model.id));
      });
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
}

export let COMMENT_SERVICE_PROVIDER = [CommentService];
