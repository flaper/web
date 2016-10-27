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
import {UserSubscriptions} from "./components/UserSubscriptions/UserSubscriptions";
import {SubscriptionAutoList} from "./components/subscription/SubscriptionAutoList/SubscriptionAutoList";
import {SubscriptionList} from "./components/subscription/SubscriptionList/SubscriptionList";
import {SubscriptionItem} from "./components/subscription/SubscriptionItem/SubscriptionItem";
import {SubscriberItem} from "./components/subscription/SubscriberItem/SubscriberItem";

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
      {path: 'favorite', component: UserFavorite},
      {path: 'subscription', component: UserSubscriptions},
    ]
  }
];

@NgModule({
  declarations: [PageUser, UserInfo, UserStories, UserStats, UserLike, UserLikes, UserFavorite, UserSubscriptions,
    SubscriptionAutoList, SubscriptionList, SubscriptionItem, SubscriberItem],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule {
  static routes = routes;
}
