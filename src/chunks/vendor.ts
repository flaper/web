// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module


//lodash about 31KB
import "lodash/keyBy";
import "lodash/get";
import "lodash/forOwn";
import "lodash/merge";//this method 10KB, can be removed
import "lodash/uniq";
import "lodash/mapValues";

import * as moment from 'moment';//51KB if no locales (else ~215)
moment.locale('ru');//~ 4KB, angular2-moment/node_modules should be removed if locale not working

import 'autosize'; //4 KB

import 'dropzone'; //33 KB

if ('production' === ENV) {
  // Production


} else {
  // Development

}
