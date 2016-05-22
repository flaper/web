import {Injectable} from '@angular/core';
import {API_BASE_URL} from "./ApiService";
import {ApiService} from "flaper";

export const IMAGE_UPLOAD_URL = `${API_BASE_URL}images`;
@Injectable()
export class ImageService {
  constructor(private api:ApiService) {
  }
}

export let IMAGE_SERVICE_PROVIDER = [ImageService];
