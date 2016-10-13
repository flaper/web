import {LayoutObject} from "./LayoutObject";
import {PageObjectMain} from "../PageObjectMain/PageObjectMain";
import {PageManage} from "../PageManage/PageManage";
import {PageManageRequest} from "../PageManageRequest/PageManageRequest";
import {PageReview} from "../PageReview/PageReview";
import {PageStory} from "../../story/read/PageStory";
import {PageWriteStory} from "../../story/write/PageWriteStory";
const children = [
  {path: '', component: PageObjectMain},
  {path: '-main', component: PageObjectMain},
  {path: '-manage', component: PageManage},
  {path: '-manageRequest', component: PageManage},
  {path: '-request', component: PageManageRequest},
  {path: '-review', component: PageReview},
  {path: ':reviewSlug', component: PageStory}
  {path: ':reviewSlug/edit', component: PageWriteStory}
];
export const ObjectRoutes =
  [
    {
      path: 'места/:region/:slug', component: LayoutObject,
      data: {mainDomain: 'места'}, children
    },
    {
      // тоже 'места'
      path: '%D0%BC%D0%B5%D1%81%D1%82%D0%B0/:region/:slug', component: LayoutObject,
      data: {mainDomain: 'места'}, children
    },
    // остальные домены
    {path: ':mainDomain/:slug', component: LayoutObject, children},
  ];
