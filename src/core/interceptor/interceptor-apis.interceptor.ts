import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, BehaviorSubject, filter, take, tap } from 'rxjs';
import { APIS_URL, API_KEY_CONNECTION } from '@services/http-utils/apis-url';
import { environment } from '@environments/environment';
import { ConnectionService } from '@services/connection-api/connection-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionInterceptor implements HttpInterceptor {
  private token = '';
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isRefreshingToken = false;

  constructor(private connectionService: ConnectionService) {
    this.tokenSubject.subscribe((token) => (this.token = token));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(APIS_URL[API_KEY_CONNECTION.GET_TOKEN].path)) {
      return next.handle(request);
    }

    if (request.url.includes(environment.connection)) {
      if (this.token) {
        request = this.addTokenToRequest(request, this.token);
        return next.handle(request);
      } else {
        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
          this.connectionService
            .getTokenConnection()
            .pipe(
              tap((token) => {
                this.isRefreshingToken = false;
                this.tokenSubject.next(token);
              })
            )
            .subscribe();
        }
        return this.tokenSubject.pipe(
          filter((token) => token !== ''),
          take(1),
          switchMap((token) => {
            request = this.addTokenToRequest(request, token);
            return next.handle(request);
          })
        );
      }
    }

    return next.handle(request);
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
