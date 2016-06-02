import {ALL_PROVIDERS} from 'flaper';
import {PAGE_PROVIDER} from './helpers/PageService';
import {METRIKA_PROVIDER} from './metrics/Metrika';
import {PAYMENT_SERVICE_PROVIDER} from './payment/PaymentService';

// Include injectables that you want to have globally throughout our app
export let PROVIDERS:Array<any> = [
  ALL_PROVIDERS,
  PAGE_PROVIDER,
  METRIKA_PROVIDER,
  PAYMENT_SERVICE_PROVIDER
];
