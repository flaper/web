import {Component} from '@angular/core';
import {FObject, ObjectService, UserService, User} from "@flaper/angular";
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'page-manage',
  template: require('./PageManage.html'),
  styles: [require('./PageManage.scss')]
})
export class PageManage {
  obj:FObject;
  moderators:User[] = []
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
                      let userQuery = {
                        where : {
                          flapIds: {inq: [this.obj.id]}
                        }
                      };
                      _user.get(userQuery).subscribe(users => {
                        this.moderators = users;
                        console.log(users);
                      });
                    });
                });
  }
  ngOnInit() {
  }
  addAsModerator(user) {
    this._user.addRightsForObject(user.id, this.obj.id).subscribe(data => console.log(data));
  }
  whenFound(users) {
    this.foundUsers = users;
  }
}
