import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from "./../ApiService";

const DOMAINS = {
  PLACES: 'места'
};

@Injectable()
export class ObjectService {
  constructor(private api:ApiService, private router:Router) {
  }

  getBySlug({slug, mainDomain, region = null}) {
    let query = {mainDomain, slug};
    if (region) {
      query['region'] = region;
    }
    return this.api.request('get', `objects/bySlug`, query);
  }

  static getUrl(obj) {
    if (obj.mainDomain === DOMAINS.PLACES) {
      let url = obj.mainDomain + '/';
      if (obj.region) {
        url += obj.region + '/';
      }
      return url + obj.slug;
    } else {
      return obj.mainDomain + '/' + obj.slug;
    }
  }

  navigateTo(obj) {
    this.router.navigateByUrl(ObjectService.getUrl(obj));
  }
}

export let OBJECT_SERVICE_PROVIDER = [ObjectService];
