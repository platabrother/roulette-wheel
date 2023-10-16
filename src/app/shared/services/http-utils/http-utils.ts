import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { APIS_URL, ApiUrl } from './apis-url';
import { environment } from '@environments/environment';
import { TimestampObservableCache } from '@interfaces/connection-api/timestamp-cache.interface';

interface CacheItem<T = unknown> {
  [key: string]: TimestampObservableCache<T>;
}

@Injectable()
export class HttpUtils {
  private requestChached: CacheItem = {};

  constructor(public http: HttpClient) {}

  public getApiMatched(url: string, params: any = {}): string {
    const queryParams = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.set(key, params[key]);
      }
    }
    const queryString = queryParams.toString();
    if (queryString) {
      url = url.includes('?')
        ? url + '&' + queryString
        : url + '?' + queryString;
    }
    return url;
  }

  public getApi(keyApi: string): ApiUrl {
    for (const [key, value] of Object.entries(APIS_URL)) {
      if (keyApi === key) return value;
    }

    return { path: keyApi, server: environment.connection };
  }

  public getUrl(apiKey: string): string {
    const api: ApiUrl = this.getApi(apiKey);
    return api.server + api.path;
  }

  public getUrlMatched(apiKey: string, params = {}): string {
    const api: ApiUrl = this.getApi(apiKey);
    return api.server + this.getApiMatched(api.path, params);
  }

  public deleteCacheItem(key: string): void {
    delete this.requestChached[key];
  }

  public get<T>(
    keyApi: string,
    params = {},
    queryParams = {},
    refresh?: boolean,
    useCache: boolean = true
  ): Observable<T> {
    const api: ApiUrl = this.getApi(keyApi);

    const originalParams = { ...params };

    const apiKey = this.getApiMatched(api.path, params);
    if (refresh) {
      this.deleteCacheItem(apiKey);
      return this.getAndSave(api, false);
    }
    const observableCached = this.getCacheItem<T>(apiKey);
    if (useCache && observableCached) {
      return observableCached;
    }
    let url = this.addParamsToUrl(api.path, originalParams);
    url = this.addParamsToUrl(url, queryParams);
    return this.getAndSave({ path: url, server: api.server }, false);
  }

  private addParamsToUrl(url: string, params: any): string {
    const queryParams = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.set(key, params[key]);
      }
    }
    const queryString = queryParams.toString();
    if (queryString) {
      url = url.includes('?')
        ? url + '&' + queryString
        : url + '?' + queryString;
    }
    return url;
  }

  //   POST
  public post<T>(keyApi: string, params = {}, body = {}): Observable<T> {
    const api: ApiUrl = this.getApi(keyApi);
    const apiKey = this.getApiMatched(api.path, params);
    return this.postAndSave({ path: apiKey, server: api.server }, body);
  }

  private getAndSave<T>(api: ApiUrl, useCache: boolean = true): Observable<T> {
    const observable = this.http.get<T>(api.server + api.path).pipe(
      shareReplay(1),
      catchError((err: HttpErrorResponse) => {
        this.deleteCacheItem(api.path);
        return throwError(err);
      })
    );
    if (useCache) {
      this.setCacheItem(api.path, observable);
    }
    return observable;
  }

  private getCacheItem<T>(key: string): Observable<T> | null {
    const cacheItem = this.requestChached[key] as
      | TimestampObservableCache<T>
      | undefined;
    if (!cacheItem) {
      return null;
    }
    // delete the cache item if it has expired
    if (cacheItem.expires <= Date.now()) {
      this.deleteCacheItem(key);
      return null;
    }
    return cacheItem.observable;
  }

  private setCacheItem<T>(key: string, value: Observable<T>): void {
    const EXPIRES = Date.now() + (1000 * 60 * 60) / 2;
    this.requestChached[key] = {
      expires: EXPIRES,
      observable: value,
    } as TimestampObservableCache<T>;
  }

  private postAndSave<T>(api: ApiUrl, body: any): Observable<T> {
    return this.http.post<T>(api.server + api.path, body);
  }
}
