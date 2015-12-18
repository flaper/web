import {Injectable} from 'angular2/core';
import {ApiService} from "./ApiService";
import * as Rx from 'rxjs';

@Injectable()
export class StoryService {
  constructor(private api:ApiService) {
  }

  get() {
    return this.api.request('get', 'stories');
  }

  getBySlug(slug) {
    return this.api.request('get', `stories/slug/${slug}`);
  }
}

export let STORY_SERVICE_PROVIDER = [StoryService];
