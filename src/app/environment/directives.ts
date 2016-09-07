/*
 * These are globally available directives in any template
 */

import {Autosize} from "../../app/directives/Autosize/Autosize";
import {LikeComponent} from "../../app/components/like/LikeComponent/LikeComponent";
import {AutoFocusIt, ObjectLink} from "@flaper/angular";
import {UserLink} from "../../app/components/user/UserLink/UserLink";
import {UserAvatar} from "../../app/components/user/UserAvatar/UserAvatar";

// application directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  Autosize,
  AutoFocusIt,
  UserLink,
  UserAvatar,
  LikeComponent,
  ObjectLink
];
