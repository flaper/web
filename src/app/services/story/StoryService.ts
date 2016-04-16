import {Injectable} from 'angular2/core';
import {ApiService} from "./../ApiService";
import {LikeService} from "./../LikeService";
import {Config} from '../../config/Config';

@Injectable()
export class StoryService {
  LIMIT = Config.limit;

  constructor(private api:ApiService, private likeService:LikeService) {
  }


  get({where, order = "", skip = 0}) {
    let filter = JSON.stringify({where: where, order: order, skip: skip, limit: this.LIMIT});
    return this.api.request('get', 'stories', {filter: filter})
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

  private changeStatus(id, action) {
    if (!id) throw 'Story.changeStatus - subjectId required';
    let observable = this.api.request('put', `stories/${id}/status/${action}`).publishLast();
    observable.connect();
    return observable;
  }
}

export let STORY_SERVICE_PROVIDER = [StoryService];
