import { Inject, Injectable } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { MyRequestBase } from 'src/core/config/config.data';

interface MinimalRequest {
  headers: { [header: string]: string | undefined };
}

@Injectable()
export class MyRequestServer implements MyRequestBase {
  constructor(@Inject(REQUEST) private request: MinimalRequest) {}

  getRequestHeaders(): string {
    const acceptLanguage = this.request.headers['accept-language'];
    return acceptLanguage || '';
  }
}
