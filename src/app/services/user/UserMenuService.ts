import {Injectable} from '@angular/core';
import {UserService, AuthService, ObjectService, ACL} from '@flaper/angular';

@Injectable()
export class UserMenuService {
  flaperDefault = [
    {title: 'Баллы', routerLink: ['/s', 'Баллы'], iconClass: 'fa fa-money'},
    {title: 'Правила', routerLink: ['/s', 'Правила'], iconClass: 'fa fa-info'},
    {title: 'О проекте', routerLink: ['/s', 'Флапер'], iconClass: 'fa fa-info-circle'}
  ];
  constructor(private _acl:ACL,private _user:UserService,private _object:ObjectService,public _auth:AuthService) {

  }
  getFlaperMenu() {
    let menu = [];
    if (this._acl.isSales()) menu.push({title:"Админка Поддержки",routerLink:["/p","support","admin"],iconClass: 'fa fa-question-circle'});
    if (this._user.currentUser) {
      if (this._user.currentUser.extra.hasPremiumSupport())
        menu.push({title:"Премиум Поддержка",routerLink:["/p","support","premium"],iconClass: 'fa fa-question'});
      for (let objectId of this._user.currentUser.extra.getObjects()) {
        if (this._object.$getById(objectId))
        menu.push({title:this._object.$getById(objectId).title, routerLink:this._object.getRouteById(objectId),iconClass: 'fa fa-briefcase'});
      }
      menu.push({title:"Моя страница",routerLink:["/u",this._user.currentUserId],iconClass: 'fa fa-user'});
      menu = menu.concat(this.flaperDefault);
      // menu.push({title:"Выход",onClick:this._auth.logout,iconClass: 'fa fa-sign-out'});
    }

    if (this._acl.isSuper()){
      menu.push({title:"Test.Вопросы и голосования",routerLink:["/p","polls"],iconClass: 'fa fa-group'});
      menu.push({title:"Test.Предложения",routerLink:["/p","ideas"],iconClass: 'fa fa-group'});
    }

    return menu;
  }
}

export let USER_MENU_PROVIDER = [UserMenuService];
