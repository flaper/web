import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from "../../shared/shared.module";
import {PagePoll} from "./PagePoll/PagePoll";
import {PageIdeas} from "./PageIdeas/PageIdeas";
import {PagePollCreate} from "./PagePollCreate/PagePollCreate";
import {PollItem} from "./PollItem/PollItem";
import {PollList} from "./PollList/PollList";
import {PollWrite} from "./PollWrite/PollWrite";
import {PagePollSingle} from "./PagePollSingle/PagePollSingle";

export const routes = [
  {
    path: 'p',
    children: [
      { path: 'polls/create', component: PagePollCreate },
      { path: 'polls', component: PagePoll },
      { path: 'ideas', component: PageIdeas },
      { path: 'ideas/:id', component: PagePollSingle },
      { path: 'polls/:id', component: PagePollSingle }
    ]
  }
];

@NgModule({
  declarations: [PagePoll, PageIdeas, PagePollCreate, PollItem, PollList, PollWrite, PagePollSingle],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PollModule {
  static routes = routes;
}
