let _ = require('lodash');

let common = require('./config.json');
let localConfig = require('./config.local.json');

export let Config = _.merge({}, common, localConfig);

