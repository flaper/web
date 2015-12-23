import {Injectable} from 'angular2/core';
import {ApiService, API_BASE_URL} from "./ApiService";
import * as Rx from 'rxjs';

export const IMAGE_UPLOAD_URL = `${API_BASE_URL}images`;
@Injectable()
export class ImageService {
  constructor(private api:ApiService) {
  }
}

export let IMAGE_SERVICE_PROVIDER = [ImageService];
