import { Injectable } from '@angular/core';
import { MyRequestBase } from 'src/core/config/config.data';

@Injectable()
export class MyRequestBrowser implements MyRequestBase {
  getRequestHeaders() {
    return '';
  }
}
