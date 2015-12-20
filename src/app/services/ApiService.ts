import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Headers, URLSearchParams} from 'angular2/http';

import {Config} from '../config/Config';
import {URLSearchParams} from "../../../node_modules/angular2/ts/src/http/url_search_params";
import {Url} from "url";
import {URLSearchParams} from "../../../node_modules/angular2/ts/src/http/url_search_params";
export const API_SERVER_URL = `http://${Config.api.host}:${Config.api.port}`;

const API_BASE_URL = `${API_SERVER_URL}/api/`;

@Injectable()
export class ApiService {
  constructor(public http:Http) {
  }

  //should be via AuthService in future, cannot make it works on angular alpha
  static getJwtToken() {
    let data = localStorage.getItem('jwt');
    if (data) {
      try {
        data = JSON.parse(data);
        return data.id;
      }
      finally {

      }
    }
    return null;
  }


  request(method, url, data = null) {
    let token = ApiService.getJwtToken();
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

    return query.map(result => {
      let text = result.text();
      //e.g. empty result can be returned for "delete"
      if (text === '') {
        return {};
      }
      return result.json()
    }).map(result => {
      //ApiService.logging(`Got answer: ${JSON.stringify(result)}` , LOG_TYPE);
      //localizing errors
      //if (result.error && result.error.details) {
      //let firstError = '';
      //let details = result.error.details;
      //for (let field in details.codes) {
      //  let errors = details.codes[field];
      //  for (let key in errors) {
      //    let error = errors[key];
      //    let message = ApiService.validationMessage(error, field, result.error.details.context);
      //    details.messages[field][key] = message;
      //    firstError = firstError ? firstError : message;
      //  }
      //}
      //result.error.message = firstError ? firstError : result.error.message;
      //}
      return result;
    });
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
