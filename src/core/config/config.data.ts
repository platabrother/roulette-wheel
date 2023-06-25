import { InjectionToken } from '@angular/core';

export const MY_REQUEST = new InjectionToken<MyRequestBase>('MY_REQUEST');

export abstract class MyRequestBase {
  abstract getRequestHeaders(): string;
}
