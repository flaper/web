import {Injectable} from 'angular2/core';
import {ApiService} from "./ApiService";
import {LikeService} from "./LikeService";

@Injectable()
export class StoryService {
  constructor(private api:ApiService, private likeService:LikeService) {
  }

  get({where}) {
    return this.api.request('get', 'stories', {filter: JSON.stringify({where: where})})
      .do((data) => {
        this.likeService.requestLikesInfo(data.map(model => model.id));
      });
  }

  getBySlug(slug) {
    return this.api.request('get', `stories/slug/${slug}`);
  }

  post(data) {
    return this.api.request('post', 'stories', data);
  }

  put(data) {
    return this.api.request('put', `stories/${data.id}`, data);
  }

  save(data) {
    return data.id ? this.put(data) : this.post(data);
  }

  del(subjectId) {
    return this.changeStatus(subjectId, 'delete');
  }

  deny(subjectId) {
    return this.changeStatus(subjectId, 'deny');
  }

  private changeStatus(subjectId, action) {
    if (!subjectId) throw 'Story.changeStatus - subjectId required';
    let observable = this.api.request('put', `stories/${subjectId}/status/${action}`).publishLast();
    observable.connect();
    return observable;
  }
}

export let STORY_SERVICE_PROVIDER = [StoryService];
