import {Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {ApiService} from "./../ApiService";
import {FObject} from "../../models/common/FObject";
import {DOMAINS} from "../../models/common/Domain"


@Injectable()
export class ObjectService {
  constructor(private api:ApiService, private router:Router) {
  }

  getBySlug({slug, mainDomain, region = null}) {
    let query = {mainDomain, slug};
    if (region) {
      query['region'] = region;
    }
    return this.api.request('get', `objects/bySlug`, query)
      .map(data => new FObject({init: data}));
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

  static getRoute(obj) {
    let params = {mainDomain: obj.mainDomain, slug: obj.slug};
    if (obj.mainDomain === DOMAINS.PLACES) {
      if (obj.region) {
        params['region'] = obj.region;
      }
    }
    return ['LayoutObject', params];
  }


  navigateTo(obj, action = null) {
    let url = ObjectService.getUrl(obj);
    if (action) {
      url += '/' + action;
    }
    this.router.navigateByUrl(url);
  }
}

export let OBJECT_SERVICE_PROVIDER = [ObjectService];
