Error.stackTraceLimit = Infinity;
require('phantomjs-polyfill');
require('core-js');
require('reflect-metadata');
require('zone.js/dist/zone-microtask.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/jasmine-patch.js');
require('angular2/testing');

var testContext = require.context('./test', true, /\.spec\.ts/);
var appContext = require.context('./src', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);
testContext.keys().forEach(testContext);

var domAdapter = require('angular2/src/platform/browser/browser_adapter');
domAdapter.BrowserDomAdapter.makeCurrent();
