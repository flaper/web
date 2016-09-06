import {Component,Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  subjectTypes = ["Story","Comment"];
  type:string;
  it_forMe    = false;

  loading = false;
  limit = 20;
  pages:number;
  current_page:number;
  offset:number;
  constructor(route:ActivatedRoute,private like:LikeService, private _user:UserService, private story:StoryService, private comment:CommentService){
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
      this.it_forMe = route.snapshot.url[0]['path'] === 'like';
      this.getPages();
    });
  }

  getWhere(val):Object{
    if(val){
      return { subjectUserId: this.user['id'], subjectType: {inq:this.subjectTypes} };;
    }else{
      return { userId: this.user['id'], subjectType: {inq:this.subjectTypes} };;
    }
  }

  findStories(){
    this.subjectTypes = ["Story"];
    this.type = 'Story';
    this.getPages();
  }

  findComments(){
    this.subjectTypes = ["Comment"];
    this.type = 'Comment';
    this.getPages();
  }

  findAll(){
    this.subjectTypes = ["Story","Comment"];
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
      this.getFans(likes);
    });
  }

  getFans(likes){
    let ids = {};
    ids['userIds'] = [];
    ids['subjectIds'] = [];
    ids['subjectUserIds'] = [];
    ids['contentIds'] = {};
    ids['contentIds']['storyIds'] = [];
    ids['contentIds']['commentIds'] = [];
    likes.map(like =>{
      ids['userIds'].push(like['userId']);
      ids['userIds'].push(like['subjectUserId']);
      ids['subjectIds'].push(like['subjectId']);
      if(like['subjectType'] == "Story")   ids['contentIds']['storyIds'].push(like['subjectId']);
      if(like['subjectType'] == "Comment") ids['contentIds']['commentIds'].push(like['subjectId']);
    });
    let userFilter = {where: {id: {inq:ids['userIds']} }, fields: {id:true, displayName:true, photo:true}};
    this._user.get(userFilter).subscribe(fans => {
      if(this.subjectTypes.length > 1) this.getMixContent(ids['contentIds'],likes,fans)
      else this.getContents(ids['subjectIds'],likes,fans);
    });
  }

  getMixContent(ids,likes,fans){
    let contents = {};
    let filter = {where: {id: {inq:ids['commentIds']} }, limit: this.limit, fields: {id:true, subjectId:true, shortInline:true, subjectType:true}};
    this.comment.get(filter).subscribe(comments => {
      contents['comments'] = comments;
      let subIds = [];
      comments.map(comment => {
        subIds.push(comment['subjectId']);
      });
      let filter = {where: {id: {inq:subIds} }, limit: this.limit, fields: {id:true, slug:true}};
      this.story.get(filter).subscribe(subStories =>{
        contents['subStories'] = subStories;
        let filter = {where: {id: {inq:ids['storyIds']} }, limit: this.limit, fields: {id:true, title:true, slug:true, shortText:true}};
        this.story.get(filter).subscribe(stories =>{
          contents['stories'] = stories;
          this.findFanbase(likes,fans, contents);
        });
      });
    });
  }

  getContents(subjectIds,likes,fans){
    let contents = {};
    switch(this.subjectTypes[0]){
      case 'Comment':
        let filter1 = {where: {id: {inq:subjectIds} }, limit: this.limit, fields: {id:true, subjectId:true, shortInline:true, subjectType:true}};
        this.comment.get(filter1).subscribe(comments => {
          contents['comments'] = comments;
          let ids = [];
          comments.map(comment => {
            ids.push(comment['subjectId']);
          });
          let filter = {where: {id: {inq:ids} }, limit: this.limit, fields: {id:true, title:true, slug:true}};
          this.story.get(filter).subscribe(stories =>{
            contents['subStories'] = stories;
            this.findFanbase(likes,fans, contents);
          });
        });
        break;
      default:
        let filter2 = {where: {id: {inq:subjectIds} }, limit: this.limit, fields: {id:true, title:true, slug:true, shortText:true}};
        this.story.get(filter2).subscribe(stories =>{
          contents['stories'] = stories;
          this.findFanbase(likes,fans, contents);
        });
        break;
    }
  }

  findFanbase(likes, fans, contents){
    this.loading = true;
    this.fanbase = [];
    let data = {};
    likes.map(like =>{
      let fansOne = fans.filter(fan => {
        return fan['id'] == like['userId']
      });
      let authorsOne = fans.filter(author => {
        return author['id'] == like['subjectUserId']
      });
      if(fansOne.length > 0)    data['fan']    = fansOne[0];
      if(authorsOne.length > 0) data['author'] = authorsOne[0];
      let storiesOne = [];
      let commentsOne = [];
      data['content'] = {};
      switch(like['subjectType']){
        case 'Story':
          storiesOne = contents['stories'].filter(story =>{
            return story['id'] == like['subjectId']
          });
          if(storiesOne.length > 0) data['content']['story'] = storiesOne[0];
          break;
        case 'Comment':
          commentsOne = contents['comments'].filter(comment =>{
            return comment['id'] == like['subjectId']
          });
          if(commentsOne.length > 0){
            data['content']['comment'] = commentsOne[0];
            storiesOne = contents['subStories'].filter(story =>{
              return story['id'] == commentsOne[0]['subjectId']
            });
            if(storiesOne.length > 0) data['content']['subStory'] = storiesOne[0];
          }
          break;
      }
      let list = {};
      let dataContent = data['content'].hasOwnProperty('story')||(data['content'].hasOwnProperty('subStory')&&data['content'].hasOwnProperty('comment'));
      if (data['fan']&&data['author']&&dataContent) list = {created: like['created'],type: like['subjectType'], fan:  data['fan'], author:  data['author'], content: data['content']};
      else list = undefined;
      this.fanbase.push(list);
      console.log("PAGE = "+this.current_page+"\n"+"FB = "+JSON.stringify(list))
    });

  }
}
