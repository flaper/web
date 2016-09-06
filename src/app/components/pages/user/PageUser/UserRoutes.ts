import {UserStories} from "../../../user/UserStories/UserStories";
import {UserInfo} from "../../../user/UserInfo/UserInfo";
import {UserStats} from "../../../user/UserStats/UserStats";
import {UserLike} from "../../../user/UserLikes/UserLike/UserLike";
import {UserFavorite} from "../../../user/UserLikes/UserFavorite/UserFavorite";
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
    {path: 'like', component: UserLike},
    {path: 'favorite', component: UserFavorite},
  ]
};
