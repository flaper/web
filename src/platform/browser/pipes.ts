/*
 * These are globally available pipes in any template
 */

import {provide, PLATFORM_PIPES} from '@angular/core';
import {TimeAgoPipe} from "angular2-moment/TimeAgoPipe";
import {FixedPipe} from "../../app/pipes/FixedPipe";
import {FlapImagePipe} from "../../app/pipes/FlapImagePipe";
import {CalendarPipe} from "../../../node_modules/angular2-moment/CalendarPipe";
import {DateFormatPipe} from "../../../node_modules/angular2-moment/DateFormatPipe";

// application_pipes: pipes that are global through out the application
export const APPLICATION_PIPES = [
  FixedPipe,
  TimeAgoPipe,
  DateFormatPipe,
  FlapImagePipe
];

export const PIPES = [
  provide(PLATFORM_PIPES, {useValue: APPLICATION_PIPES, multi: true})
];
