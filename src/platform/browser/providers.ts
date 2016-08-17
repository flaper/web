import {provide} from '@angular/core';

// Angular 2
import {FORM_PROVIDERS, LocationStrategy, PathLocationStrategy} from '@angular/common';

// Angular 2 Http
import {HTTP_PROVIDERS} from '@angular/http';
import {Title} from "@angular/platform-browser"

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
export const APPLICATION_PROVIDERS = [
  Title,
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  {provide: LocationStrategy, useClass: PathLocationStrategy},
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
