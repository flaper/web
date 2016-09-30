import {Component, Input} from "@angular/core";
import {FObject, ObjectService, UserService} from "@flaper/angular";
@Component({
  selector: "object-mod-switch",
  styles: [require('./ObjectModeratorSwitch.scss')],
  template: require('./ObjectModeratorSwitch.html')
})

export class ObjectModeratorList {
  object:FObject;
  constructor(private _object:ObjectService, private _users:UserService) {

  }

}
