import {API_SERVICE_PROVIDER} from './ApiService';
import {AUTH_SERVICE_PROVIDER} from './AuthService';
import {USER_SERVICE_PROVIDER} from './UserService';

// Include injectables that you want to have globally throughout our app
export let APP_PROVIDERS:Array<any> = [
  API_SERVICE_PROVIDER,
  AUTH_SERVICE_PROVIDER,
  USER_SERVICE_PROVIDER
];
