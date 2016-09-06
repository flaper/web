import {API_BASE_URL, API_SERVER_URL} from './app/services/consts/Consts';
import {Config} from './app/config/Config';
import {Config as LibConfig} from '@flaper/angular';
import {PageService} from "./app/services/helpers/PageService";

LibConfig.Init({
  API_URL: API_BASE_URL,
  API_SERVER_URL: API_SERVER_URL,
  PAGE_LIMIT: Config.limit,
  SUCCESS_LOGIN_CALLBACK: PageService.NavigateAfterLogin
});

/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { ApplicationRef } from '@angular/core';
import { bootloader } from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main():Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));

}


bootloader(main);
