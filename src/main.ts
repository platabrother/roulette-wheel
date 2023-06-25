import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';
import { worker } from './mocks/browser';

console.log(
  ` ***************************
 *  APP VERSION ${environment.appVersion} 
 ****************************`
);

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppBrowserModule)
    .catch((err) => console.log(err));
};

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
if (environment.mockServer) {
  console.log('Is mock env start mock server');
  worker.start({
    onUnhandledRequest: 'bypass'
  });
}
