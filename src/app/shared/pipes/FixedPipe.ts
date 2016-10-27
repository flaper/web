import {Pipe} from '@angular/core';

@Pipe({
  name: 'fixed'
})
export class FixedPipe {
  transform(value, digits = 2):string {
    if (typeof value === 'string') {
      value = +value;
    }
    return value.toFixed(digits);
  }
}
