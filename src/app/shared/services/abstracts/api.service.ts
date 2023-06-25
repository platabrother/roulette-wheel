import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { QueryParamsGeneric } from '@interfaces/params-generic.interface';
import { HttpUtils } from '@services/http-utils/http-utils';


@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  constructor(private httpUtils: HttpUtils) {}

  public getData(apiKey: string, params?: QueryParamsGeneric): Observable<T> {
    return this.httpUtils.get<T>(apiKey, params).pipe(shareReplay());
  }
}
