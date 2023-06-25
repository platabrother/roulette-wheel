import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppBrowserModule } from './app.browser.module';
import { AppComponent } from './app.component';
import { MyRequestServer } from '@services/requests/request.server';
import { MY_REQUEST } from 'src/core/config/config.data';

@NgModule({
  imports: [AppBrowserModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [{ provide: MY_REQUEST, useClass: MyRequestServer }]
})
export class AppServerModule {}
