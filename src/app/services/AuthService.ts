import {Injectable} from 'angular2/core';
import {ApiService} from './ApiService';

export let PROVIDERS = [
  {name: 'vk', loginTitle: 'Войти через Вконтакте'},
  {name: 'odnoklassniki', loginTitle: 'Войти через Одноклассники'},
  {name: 'facebook', loginTitle: 'Войти через Facebook'},
  {name: 'google', loginTitle: 'Войти через Google'},
];

@Injectable()
export class AuthService {
  constructor(private apiService:ApiService) {

  }
}

export let AUTH_SERVICE_PROVIDER = [AuthService];
