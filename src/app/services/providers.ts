import {ALL_PROVIDERS} from '@flaper/angular';
import {PAGE_PROVIDER} from './helpers/PageService';
import {METRIKA_PROVIDER} from './metrics/Metrika';
import {PAYMENT_SERVICE_PROVIDER} from './payment/PaymentService';
import {POPUP_PROVIDER} from './popup/PopupService';

// Include injectables that you want to have globally throughout our app
//noinspection TypeScriptValidateTypes
export let SERVICES_PROVIDERS:Array<any> = [
  ALL_PROVIDERS,
  PAGE_PROVIDER,
  METRIKA_PROVIDER,
  PAYMENT_SERVICE_PROVIDER,
  POPUP_PROVIDER
];
