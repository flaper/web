import {Injectable} from '@angular/core';
import {ApiService, API_BASE_URL} from "./ApiService";

export const IMAGE_UPLOAD_URL = `${API_BASE_URL}images`;
@Injectable()
export class ImageService {
  constructor(private api:ApiService) {
  }
}

export let IMAGE_SERVICE_PROVIDER = [ImageService];
