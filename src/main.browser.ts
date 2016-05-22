import {bootstrap} from '@angular/platform-browser-dynamic';
import {API_BASE_URL, API_SERVER_URL} from './app/services/consts/Consts';
import {Config as LibConfig} from 'flaper';
import {ComponentResolver} from '@angular/core';
import {PageService} from "./app/services/helpers/PageService";

LibConfig.Init({
  API_URL: API_BASE_URL,
  API_SERVER_URL: API_SERVER_URL,
  SUCCESS_LOGIN_CALLBACK: PageService.NavigateAfterLogin
});

/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App, APP_PROVIDERS} from './app/index';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?:any):Promise<any> {
  return bootstrap(App, [
    ...ENV_PROVIDERS,
    ...PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS,
  ])
    .catch(err => console.error(err));

}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
