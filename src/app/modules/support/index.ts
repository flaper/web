import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from "../../shared/shared.module";
import {PageAdminSupport} from "./PageAdminSupport/PageAdminSupport";
import {PagePremiumSupport} from "./PagePremiumSupport/PagePremiumSupport";
import {PremiumMessages} from "./PremiumMessages/PremiumMessages";
import {PageSupportPayment} from "./PageSupportPayment/PageSupportPayment";

export const routes = [
  {
    path: 'p/support',
    children: [
      {path: 'premium', component: PagePremiumSupport},
      {path: 'admin', component: PageAdminSupport},
      {path: 'payment', component: PageSupportPayment},
    ]
  }
];

@NgModule({
  declarations: [PremiumMessages, PagePremiumSupport, PageAdminSupport, PageSupportPayment],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class SupportModule {
  static routes = routes;
}
