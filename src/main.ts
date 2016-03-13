/*
 * Providers provided by Angular
 */
import * as browser from 'angular2/platform/browser';
import * as ngCore from 'angular2/core';
import {enableProdMode} from 'angular2/core';
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {APP_PROVIDERS} from './app/services/providers';

import * as moment from 'moment';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';
require('./css/main.scss');

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
// application_providers: providers that are global through out the application
const APPLICATION_PROVIDERS = [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  ...FORM_PROVIDERS,
  ...APP_PROVIDERS,
  //ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy })
];

// application_directives: directives that are global through out the application
const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  //RouterActive
];

// application_pipes: pipes that are global through out the application
const APPLICATION_PIPES = [
];


// Environment
if ('production' === ENV) {
  // Production
  ngCore.enableProdMode();
  APPLICATION_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE);
} else {
  // Development
  APPLICATION_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);
}


/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  moment.locale('ru');
  return browser.bootstrap(App, [
      ...APPLICATION_PROVIDERS,
      ngCore.provide(ngCore.PLATFORM_DIRECTIVES, {useValue: APPLICATION_DIRECTIVES, multi: true}),
      ngCore.provide(ngCore.PLATFORM_PIPES, {useValue: APPLICATION_PIPES, multi: true})
    ])
    .catch(err => console.error(err));
}


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */

function bootstrapDomReady() {
  // bootstrap after document is ready
  return document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV) {
  // activate hot module reload
  if (HMR) {
    if (document.readyState === 'complete') {
      main();
    } else {
      bootstrapDomReady();
    }
    module.hot.accept();
  } else {
    bootstrapDomReady();
  }
} else {
  bootstrapDomReady();
}
