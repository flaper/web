import {Injectable} from 'angular2/core';
import {ApiService} from "./ApiService";

@Injectable()
export class StoryService {
  constructor(private api:ApiService) {
  }

  get({where}) {
    return this.api.request('get', 'stories', {filter: JSON.stringify({where: where})});
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
}

export let STORY_SERVICE_PROVIDER = [StoryService];
