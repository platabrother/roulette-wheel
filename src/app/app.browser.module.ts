import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { HttpUtils } from '@services/http-utils/http-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MY_REQUEST } from 'src/core/config/config.data';
import { MyRequestBrowser } from '@services/requests/request.browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ConnectionInterceptor } from 'src/core/interceptors/interceptor-apis.interceptor';
import { ToolbarModule } from '@components/header/toolbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ToolbarModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MY_REQUEST, useClass: MyRequestBrowser },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConnectionInterceptor,
      multi: true,
    },
    HttpUtils,
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
