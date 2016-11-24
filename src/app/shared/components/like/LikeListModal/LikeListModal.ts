import {Component} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {User, UserService, LikeService,ILikable,StoryService,CommentService} from '@flaper/angular';

export class CustomContext extends BSModalContext {
  public subject:ILikable;
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
              private _like:LikeService,private _story:StoryService) {
    this.context = dialog.context;
    _like.getLikesHistory({subjectId: this.context.subject.id},0,0)
    .subscribe(likes => {
      let userIds = likes.map(like => like.userId);
      _user.requestIds(userIds);
      userIds.forEach(id => {
        _user.getById(id).first().subscribe(user => this.userList.push(user));
      })
    });
  }
  close() {
    this.dialog.close();
  }
}
