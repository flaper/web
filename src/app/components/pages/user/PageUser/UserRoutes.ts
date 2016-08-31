import {UserStories} from "../../../user/UserStories/UserStories";
import {UserInfo} from "../../../user/UserInfo/UserInfo";
import {UserStats} from "../../../user/UserStats/UserStats";
import {UserLikes} from "../../../user/UserLikes/UserLikes";
import {PageUser} from "./PageUser";

export const UserRoutes =
{
  path: 'u/:id',
  component: PageUser,
  children: [
    {path: 'info', component: UserInfo},
    {path: 'stats', component: UserStats},
    {path: '', component: UserStories},
    {path: 'articles', component: UserStories},
    {path: 'likes', component: UserLikes},
  ]
};
