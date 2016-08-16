/*
 * These are globally available directives in any template
 */

import {provide, PLATFORM_DIRECTIVES} from '@angular/core';

import {ROUTER_DIRECTIVES} from '@angular/router';
import {Autosize} from "../../app/directives/Autosize/Autosize";
import {LikeComponent} from "../../app/components/like/LikeComponent/LikeComponent";
import {AutoFocusIt, ObjectLink} from "@flaper/angular";
import {UserLink} from "../../app/components/user/UserLink/UserLink";
import {UserAvatar} from "../../app/components/user/UserAvatar/UserAvatar";

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  Autosize,
  AutoFocusIt,
  UserLink,
  UserAvatar,
  LikeComponent,
  ObjectLink
];

export const DIRECTIVES = [
  provide(PLATFORM_DIRECTIVES, {useValue: APPLICATION_DIRECTIVES, multi: true})
];
