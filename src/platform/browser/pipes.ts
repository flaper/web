/*
 * These are globally available pipes in any template
 */

import {provide, PLATFORM_PIPES} from 'angular2/core';
import {TimeAgoPipe} from "angular2-moment";
import {FixedPipe} from "../../app/pipes/FixedPipe";

// application_pipes: pipes that are global through out the application
export const APPLICATION_PIPES = [
  FixedPipe,
  TimeAgoPipe
];

export const PIPES = [
  provide(PLATFORM_PIPES, {useValue: APPLICATION_PIPES, multi: true})
];
