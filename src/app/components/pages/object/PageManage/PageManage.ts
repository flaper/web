import {Component} from '@angular/core';
import {FObject, ObjectService, UserService, User} from "@flaper/angular";
import {ActivatedRoute} from '@angular/router';

// управление страницей объекта
@Component({
  selector: 'page-manage',
  template: require('./PageManage.html'),
  styles: [require('./PageManage.scss')]
})
export class PageManage {
  obj:FObject;
  moderators:User[] = [];
  foundUsers:User[] = [];
  constructor(private _user:UserService, route:ActivatedRoute,
              private _object:ObjectService) {

                route.params.subscribe(params=> {
                  let path = window.location.pathname.split('/').filter(item => !!item);
                  path.splice(-1);
                  let mainDomain = decodeURIComponent(path[0]),
                      region = decodeURIComponent(path.length === 3 ? path[1] : ""),
                      slug = decodeURIComponent(path[path.length - 1]);
                  _object.getBySlug({mainDomain, region, slug})
                    .subscribe(fobject => {
                      this.obj = fobject;
                      this.getModList(this.obj.id);
                    });
                });
  }
  ngOnInit() {
  }
  getModList(objectId) {
    this._object.getOwners(objectId).subscribe(owners => {
      this._user.requestIds(owners);
      this.moderators = [];
      owners.forEach(owner => this._user.getById(owner).subscribe( user => this.moderators.push(user)));
    });
  }

  addAsModerator(user) {
    this._user.addRightsForObject(user.id, this.obj.id).subscribe(data => this.getModList(this.obj.id));
  }

  removeFromModerators(user) {
    console.log(user.id, this.obj.id);
    this._user.removeRightsForObject(user.id, this.obj.id).subscribe(data => this.getModList(this.obj.id));
  }

  whenFound(users) {
    this.foundUsers = users;
  }
}
