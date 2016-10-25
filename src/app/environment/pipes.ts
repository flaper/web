/*
 * These are globally available pipes in any template
 */

import {FixedPipe} from "../../app/pipes/FixedPipe";
import {FlapImagePipe} from "../../app/pipes/FlapImagePipe";
import {TimeAgoPipe} from "angular2-moment";
import {DateFormatPipe} from "angular2-moment";

// application_pipes: pipes that are global through out the application
export const APPLICATION_PIPES = [
  FixedPipe,
  TimeAgoPipe,
  DateFormatPipe,
  FlapImagePipe
];
