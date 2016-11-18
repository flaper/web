import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from "../../shared/shared.module";
import {PagePoll} from "./PagePoll/PagePoll";
import {PagePollCreate} from "./PagePollCreate/PagePollCreate";
import {PollItem} from "./PollItem/PollItem";
import {PollList} from "./PollList/PollList";
import {PollWrite} from "./PollWrite/PollWrite";
import {PagePollSingle} from "./PagePollSingle/PagePollSingle";

export const routes = [
  {
    path: 'p/polls',
    children: [
      {path: 'create', component: PagePollCreate},
      {path: '', component: PagePoll},
      {path: ':id', component: PagePollSingle}
    ]
  }
];

@NgModule({
  declarations: [PagePoll, PagePollCreate, PollItem, PollList, PollWrite, PagePollSingle],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PollModule {
  static routes = routes;
}
