import {Pipe} from '@angular/core';

@Pipe({
  name: 'flapImage'
})
export class FlapImagePipe {
  transform(id):string {
    let f1 = Math.floor(id / 1000000);
    let f2 = Math.floor((id % 1000000) / 1000);
    return `http://photo.flap.biz/i/orgs/${f1}/${f2}/${id}_middle.jpg`;
  }
}
