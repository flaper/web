let _ = require('lodash');

let common = require('./config.json');

let config = null;
if (ENV === 'production') {
  console.log('production');
  config = _.merge({}, common, require('./config.production.json'));
} else {
  console.log('dev');
  config = _.merge({}, common, require('./config.local.json'))
}


export let Config = config;

