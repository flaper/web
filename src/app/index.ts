// App
export * from './app.component';
export * from './app.service';

import {AppState} from './app.service';
import {PROVIDERS} from './services/providers';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  ...PROVIDERS
];
