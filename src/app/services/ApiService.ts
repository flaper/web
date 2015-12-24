import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Headers, URLSearchParams} from 'angular2/http';

import {Config} from '../config/Config';
import {Url} from "url";
import {JwtToken} from "./JwtToken";
export const API_SERVER_URL = `http://${Config.api.host}:${Config.api.port}`;

export const API_BASE_URL = `${API_SERVER_URL}/api/`;

@Injectable()
export class ApiService {
  constructor(public http:Http) {
  }


  request(method, url, data = null) {
    let token = JwtToken.get();
    let options:RequestOptionsArgs = {
      "headers": new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    let finalUrl = `${API_BASE_URL}${url}`;
    let query;
    switch (method) {
      case 'get':
        options.search = this._mapToURLSearchParams(data);
        query = this.http.get(finalUrl, options);
        break;
      default:
        query = this.http[method](finalUrl, JSON.stringify(data), options);
        break;
    }

    return query.catch((response) => {
      //error handling
      //noinspection TypeScriptUnresolvedFunction
      let text = response.text();
      let error = null;
      try {
        error = JSON.parse(text);
        error = error.error;
      }
      finally {
      }
      if (error) {
        throw error;
      } else {
        throw response;
      }
    }).map(result => {
        let text = result.text();
        //e.g. empty result can be returned for "delete"
        if (text === '') {
          return {};
        }
        return result.json()
      })
      .map(ApiService.proceedDates)
  }

  private static proceedDates(data) {
    if (data instanceof Object) {
      if (data.created) {
        data.created = new Date(data.created);
      }
      if (data.updated) {
        data.updated = new Date(data.updated);
      }
    }
    return data;
  }

  private _mapToURLSearchParams(map) {
    let params = new URLSearchParams();
    if (map) {
      Object.keys(map).forEach((key) => {
        params.set(key, map[key]);
      });
    }
    return params;
  }
}

export let API_SERVICE_PROVIDER = [ApiService];
