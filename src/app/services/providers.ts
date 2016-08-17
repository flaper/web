import {ALL_PROVIDERS} from '@flaper/angular';
import {PAGE_PROVIDER} from './helpers/PageService';
import {METRIKA_PROVIDER} from './metrics/Metrika';
import {PAYMENT_SERVICE_PROVIDER} from './payment/PaymentService';
import {provideRouter} from '@angular/router';
import {ROUTES} from '../routes';

// Include injectables that you want to have globally throughout our app
//noinspection TypeScriptValidateTypes
export let PROVIDERS:Array<any> = [
  ALL_PROVIDERS,
  provideRouter(ROUTES),
  PAGE_PROVIDER,
  METRIKA_PROVIDER,
  PAYMENT_SERVICE_PROVIDER
];
