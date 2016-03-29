import {Injectable} from 'angular2/core';
import {ApiService} from "./../ApiService";

@Injectable()
export class StoryBestService {

  constructor(private api:ApiService) {
  }

  getCurrentWinners() {
    return this.api.request('get', 'StoryBests');
  }

  post(id, place) {
    return this.api.request('post', 'StoryBests', {id, place});
  }

}

export let STORY_BEST_SERVICE_PROVIDER = [StoryBestService];
