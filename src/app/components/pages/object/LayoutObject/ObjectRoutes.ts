import {LayoutObject} from "./LayoutObject";
import {PageObjectMain} from "../PageObjectMain/PageObjectMain";
import {PageManage} from "../PageManage/PageManage";
import {PageManageRequest} from "../PageManageRequest/PageManageRequest";

const children = [
  {path: '', component: PageObjectMain},
  {path: 'main', component: PageObjectMain},
  {path: 'manage', component: PageManage},
  {path: 'request', component: PageManageRequest},
];
export const ObjectRoutes =
  [
    {
      path: 'места/:region/:slug', component: LayoutObject,
      data: {mainDomain: 'места'}, children
    },
    {
      path: '%D0%BC%D0%B5%D1%81%D1%82%D0%B0/:region/:slug', component: LayoutObject,
      data: {mainDomain: 'места'}, children
    }, //места
    {path: ':mainDomain/:slug', component: LayoutObject, children},
  ];
