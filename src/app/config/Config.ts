let _merge = require('lodash/merge');

let common = require('./config.json');

let config = null;
if (ENV === 'production') {
  config = _merge({}, common, require('./config.production.json'));
} else {
  config = _merge({}, common, require('./config.local.json'))
}


export let Config = config;

