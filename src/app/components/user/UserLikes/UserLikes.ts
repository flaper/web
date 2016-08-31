import {Component} from '@angular/core';
import {User, UserService, LikeService, StoryService,CommentService} from "@flaper/angular";
import {PageUser} from "../../pages/user/PageUser/PageUser";

@Component({
  selector: 'page-user-likes',
  styles: [require("./UserLikes.scss")],
  template: require('./UserLikes.html')
})

export class UserLikes{
  user: User;
  fanbase = [];
  subjectType = "Story";
  it_forMe    = false;

  loading = false;
  limit = 20;
  pages:number;
  current_page:number;
  offset:number;
  constructor(private like:LikeService, private _user:UserService, private story:StoryService, private comment:CommentService){
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
      this.it_forMe = this._user.isCurrentUser(this.user);
      this.getPages();
      // this.getLikes(this.getWhere(this.it_forMe));
    });
  }

  getWhere(val):Object{
    if(val){
      return { subjectUserId: this.user['id'], subjectType: this.subjectType };;
    }else{
      return { userId: this.user['id'], subjectType: this.subjectType };;
    }
  }

  findStories(){
    this.subjectType = "Story";
    this.getPages();
  }

  findComments(){
    this.subjectType = "Comment";
    this.getPages();
  }

  findForMe(){
    this.it_forMe = !this.it_forMe;
    this.getPages();
  }

  getPages(){
    this.like.count(this.getWhere(this.it_forMe)).subscribe(count=>{
      this.pages = count % this.limit;
      if (((count / this.limit) - this.pages)>0) this.pages++;
      if (this.pages > 0) this.current_page = 1;
      this.offset = 0;
      this.getLikes(this.getWhere(this.it_forMe));
    });
  }

  turnPage(page){
    this.current_page = page;
    this.offset = (this.current_page -1) * 20;
    this.getLikes(this.getWhere(this.it_forMe));
    window.scrollTo(0, 0);
  }

  getLikes(where){
    this.loading = false;
    this.like.getLikesHistory(where, this.limit, this.offset).subscribe(likes =>{
      this.getFlapers(likes);
    });
  }

  getFlapers(likes){
    let userIds = [];
    let subjectIds = [];
    likes.map(el =>{
      userIds.push(el['userId']);
      subjectIds.push(el['subjectId']);
    });
    let userFilter = {where: {id: {inq:userIds} }, fields: {id:true, displayName:true, photo:true}};
    this._user.get(userFilter).subscribe(fans => {
      this.getStories(subjectIds,likes,fans);
    });
  }

  getStories(subjectIds,likes,fans){
    switch(this.subjectType){
      case 'Comment':{
        let filter = {where: {id: {inq:subjectIds} }, limit: this.limit, fields: {id:true, subjectId:true}};
        this.comment.get(filter).subscribe(comments => {
          let ids = [];
          comments.map(comment => {
            ids.push(comment['subjectId']);
          });

          likes.forEach(like =>{
            let newId = comments.filter(comment => {
              return comment['id'] == like['subjectId']
            });
            like['subjectId'] = newId[0]['subjectId'];
          });
          let filter = {where: {id: {inq:ids} }, limit: this.limit, fields: {id:true, title:true, slug:true}};
          this.story.get(filter).subscribe(stories =>{
            this.findFanbase(likes,fans,stories);
          });
        });
        break;
      }
      default:{
        let filter = {where: {id: {inq:subjectIds} }, limit: this.limit, fields: {id:true, title:true, slug:true}};
        this.story.get(filter).subscribe(stories =>{
          this.findFanbase(likes,fans,stories);
        });
        break;
      }
    }
  }

  //Отдельный метод под каждую группу данных LIKES, FANS, STORIES
  // Метод вызывающий это всё, возможно LIKES
  // Метод собирающий FANBASE
  findFanbase(likes,fans,stories){
    this.loading = true;
    this.fanbase = [];
    likes.map(like =>{
      let fansOne = fans.filter(fan => {
        return fan['id'] == like['userId']
      });
      let storiesOne = stories.filter(story =>{
        return story['id'] == like['subjectId']
      });
      let data = {created: like['created'], fans: fansOne[0], stories: storiesOne[0]};
      this.fanbase.push(data);
    });
  }
}
