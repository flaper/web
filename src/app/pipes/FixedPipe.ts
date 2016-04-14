import {Pipe} from 'angular2/core';

@Pipe({
  name: 'fixed'
})
export class FixedPipe {
  transform(value, params):string {
    if (typeof value === 'string') {
      value = +value;
    }
    let digits = params.length > 0 ? params[0] : 2;
    return value.toFixed(digits);
  }
}
