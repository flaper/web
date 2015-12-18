let _ = require('lodash');

let common = require('./config');
let localConfig = require('./config.local');

export let Config = _.merge(common, localConfig);

