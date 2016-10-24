import {Component} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {User, UserService, LikeService} from '@flaper/angular';

export class CustomContext extends BSModalContext {
  public subjectId:string;
}

@Component({
  selector: 'like-list-modal',
  styles: [require('./LikeListModal.scss')],
  template: require('./LikeListModal.html')
})

export class LikeListModal implements ModalComponent<CustomContext> {
  context: CustomContext;
  userList:User[]=[];
  constructor(public dialog: DialogRef<CustomContext>,private _user:UserService,
              private _like:LikeService) {
    this.context = dialog.context;
    _like.getLikesHistory({subjectId: this.context.subjectId},0,0)
    .subscribe(likes => {
      let ids = likes.map(like => like.userId);
      _user.requestIds(ids);
      ids.forEach(id => _user.getById(id).subscribe(user => this.userList.push(user)));
    });
  }
  close() {
    this.dialog.close();
  }
}
