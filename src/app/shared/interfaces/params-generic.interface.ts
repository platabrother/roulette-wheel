import { Observable } from 'rxjs';

export interface QueryParamsGeneric {
  [key: string]: string | number | boolean | Observable<string | undefined>;
}
