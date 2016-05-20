// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router-deprecated';
import 'angular2-hmr';//can be removed, only for development, ~3.5KB

// RxJS
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/mergeMap';
import 'rxjs'

if ('production' === ENV) {
  // Production


} else {
  // Development

}
