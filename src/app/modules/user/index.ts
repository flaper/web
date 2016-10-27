import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from "../../shared/shared.module";
import {PageUser} from "./PageUser/PageUser";
import {UserInfo} from "./components/UserInfo/UserInfo";
import {UserStories} from "./components/UserStories/UserStories";
import {UserStats} from "./components/UserStats/UserStats";
import {UserLike} from "./components/UserLikes/UserLike/UserLike";
import {UserLikes} from "./components/UserLikes/UserLikes";
import {UserFavorite} from "./components/UserLikes/UserFavorite/UserFavorite";

export const routes = [
  {
    path: 'u/:id',
    component: PageUser,
    children: [
      {path: 'info', component: UserInfo},
      {path: 'stats', component: UserStats},
      {path: '', component: UserStories},
      {path: 'articles', component: UserStories},
      {path: 'like', component: UserLike},
      // {path: 'subscription', component: UserSubscriptions},
      {path: 'favorite', component: UserFavorite},
    ]
  }
];

@NgModule({
  declarations: [PageUser, UserInfo, UserStories, UserStats, UserLike, UserLikes, UserFavorite],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule {
  static routes = routes;
}
