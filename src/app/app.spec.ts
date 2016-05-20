import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from '@angular/testing';

// Load the implementations that should be tested
import {App} from './app';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App
  ]);

  it('should have a url', inject([ App ], (app) => {
    expect("Флапер").toEqual('Флапер');
  }));

});
