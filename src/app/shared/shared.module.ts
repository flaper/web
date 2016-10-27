import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ObjectLink, AutoFocusIt, FlapImagePipe} from '@flaper/angular';
import {MomentModule} from 'angular2-moment';
import {RouterModule} from '@angular/router';
import {Autosize} from "./directives/Autosize/Autosize";
import {LikeComponent} from "./components/like/LikeComponent/LikeComponent";
import {LikeListModal} from "./components/like/LikeListModal/LikeListModal";
import {UserLink} from "./components/user/UserLink/UserLink";
import {UserAvatar} from "./components/user/UserAvatar/UserAvatar";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {SubscribeButton} from "./components/subscribe/SubscribeButton/SubscribeButton";
import {FixedPipe} from "./pipes/FixedPipe";

@NgModule({
  imports: [CommonModule, RouterModule,
    ModalModule.withComponents([LikeListModal]), ModalModule.forRoot(), BootstrapModalModule],
  declarations: [ObjectLink, AutoFocusIt, Autosize, LikeComponent, LikeListModal, UserLink, UserAvatar,
    SubscribeButton, FixedPipe, FlapImagePipe],
  exports: [CommonModule, FormsModule, MomentModule, ObjectLink, AutoFocusIt, Autosize, LikeComponent, LikeListModal,
    UserLink, UserAvatar, SubscribeButton, FixedPipe, FlapImagePipe]
})
export class SharedModule {
}

export * from './components/user/UserAvatar/UserAvatar';
