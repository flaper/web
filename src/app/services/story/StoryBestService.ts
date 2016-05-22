import {Injectable} from '@angular/core';
import {ApiService} from 'flaper';

@Injectable()
export class StoryBestService {

  constructor(private api:ApiService) {
  }

  getCurrentWinners() {
    return this.api.request('get', 'StoryBests');
  }

  getPreviousWinners(weeksAgo) {
    return this.api.request('get', `StoryBests/${weeksAgo}`);
  }

  post(id, place) {
    return this.api.request('post', 'StoryBests', {id, place});
  }

}

export let STORY_BEST_SERVICE_PROVIDER = [StoryBestService];
