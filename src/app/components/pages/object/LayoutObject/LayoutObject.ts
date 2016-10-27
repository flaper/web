import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from "@angular/platform-browser"
import {ObjectService, UserService} from "@flaper/angular";
import {FObject} from "@flaper/angular";
import {Metrika} from "../../../../services/metrics/Metrika";
import {ReplaySubject} from "rxjs";

@Component({
  selector: 'layout-object',
  template: require('./LayoutObject.html'),
  styles: [require('./LayoutObject.scss')]
})
export class LayoutObject {
  static Object: FObject;
  static ObjectObservable;
  obj: FObject;
  permissions: string[];

  constructor(ts: Title, route: ActivatedRoute, _object: ObjectService, private _user: UserService,
              private router: Router) {
    LayoutObject.ObjectObservable = new ReplaySubject<FObject>(1);
    route.params.subscribe(params=> {
      let data = route.snapshot.data;
      let mainDomain = params['mainDomain'];
      mainDomain = mainDomain ? decodeURIComponent(mainDomain) : data['mainDomain'];
      let region = decodeURIComponent(params['region']);
      let slug = decodeURIComponent(params['slug']);
      _object.getBySlug({mainDomain, region, slug})
        .subscribe(fobject => {
          this.obj = fobject;
          LayoutObject.ObjectObservable.next(fobject);
          LayoutObject.Object = fobject;
          ts.setTitle(fobject.title);
          _object.getPermissions(fobject.id)
            .subscribe(data => this.permissions = data);
          Metrika.setParam('objId', fobject.id);
        });
    });
  }

  getLink(name) {
    if (!this.obj)
      return;
    return "/" + ([this.obj.mainDomain, this.obj.region, this.obj.slug, '-' + name].join('/'));
  }

  getManageLink() {
    if (!this.obj)
      return;
    let ifOwner = false;
    if (this._user.currentUser) {
      ifOwner = this._user.currentUser.extra.getObjects().indexOf(this.obj.id) > -1;
    }
    return ifOwner ? '/p/manageSupport' : this.getLink('manageRequest');
  }


  isMain() {
    return false;
    /* let instruction = this.router.generate(['Main']);
     return this.router.isRouteActive(instruction);*/
  }
}
