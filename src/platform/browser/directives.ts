/*
 * These are globally available directives in any template
 */

import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';

import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Autosize} from "../../app/directives/Autosize/Autosize";
import {LikeComponent} from "../../app/components/like/LikeComponent/LikeComponent";

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  Autosize,
  LikeComponent
];

export const DIRECTIVES = [
  provide(PLATFORM_DIRECTIVES, {useValue: APPLICATION_DIRECTIVES, multi: true})
];
