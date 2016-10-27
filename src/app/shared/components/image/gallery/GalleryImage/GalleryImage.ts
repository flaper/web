import {FlapImagePipe,ILikable, ICommentable} from '@flaper/angular';
export class GalleryImage implements ILikable, ICommentable {
  id:string;
  userId: string;
  likesNumber: number;
  commentsNumber: number;
  link: string;
  src: string;
  constructor(id:any) {
    this.id = id;
    if (isNaN(id)) {
      let path = this.id.replace(/([\w\d]{2})([\w\d]{2})([\w\d]+)/i,('$1/$2/$3'));
      this.src = `https://s3.eu-central-1.amazonaws.com/flaper.production.images/${path}_middle.jpg`;
    }
    else {
      this.src = new FlapImagePipe().transform(this.id);
    }
  }
}
