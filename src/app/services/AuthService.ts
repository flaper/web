import {Injectable} from 'angular2/core';
import {ApiService, API_BASE_URL} from'./ApiService';

interface Provider {
  name: string
  loginTitle: string
  authLink?: string
}
export let PROVIDERS:Provider[] = [
  {name: 'vk', loginTitle: 'Войти через Вконтакте'},
  {name: 'odnoklassniki', loginTitle: 'Войти через Одноклассники'},
  {name: 'facebook', loginTitle: 'Войти через Facebook'},
  {name: 'google', loginTitle: 'Войти через Google'},
];

PROVIDERS.forEach((provider:Provider) => {
  provider.authLink = `${API_BASE_URL}auth/${provider.name}`
});

@Injectable()
export class AuthService {
  constructor(private apiService:ApiService) {

  }
}

export let AUTH_SERVICE_PROVIDER = [AuthService];
