import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, BehaviorSubject, filter, take, catchError, finalize, EMPTY, of, throwError } from 'rxjs';
import { APIS_URL, API_KEY_CONNECTION } from '@services/http-utils/apis-url';
import { environment } from '@environments/environment';
import { ConnectionService } from '@services/connection-api/connection-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnectionInterceptor implements HttpInterceptor {
  private token = '';
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isRefreshingToken = false;

  constructor(private connectionService: ConnectionService, private router: Router) {
    this.tokenSubject.subscribe((token) => (this.token = token));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(APIS_URL[API_KEY_CONNECTION.GET_TOKEN].path)) {
      return next.handle(request);
    }

    if (request.url.includes(environment.connection)) {
      if (this.token) {
        request = this.addTokenToRequest(request, this.token);
      } else {
        return this.handle401Error(request, next);
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (this.isRefreshingToken) {
            return this.tokenSubject.pipe(
              filter((token) => token !== ''),
              take(1),
              switchMap((token) => {
                return next.handle(this.addTokenToRequest(request, token));
              })
            );
          } else {
            this.isRefreshingToken = true;

            return this.connectionService.getTokenConnection(true).pipe(
              switchMap((newToken: string) => {
                this.isRefreshingToken = false;
                this.tokenSubject.next(newToken);
                return next.handle(this.addTokenToRequest(request, newToken));
              }),
              catchError((tokenError) => {
                this.isRefreshingToken = false;
                return throwError(() => tokenError);
              })
            );
          }
        }  else {
          return throwError(() => error);
        }
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next('');

      return this.connectionService.getTokenConnection().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addTokenToRequest(request, newToken));
          }
          return this.redirectToLogin();
        }),
        catchError((error) => {
          return this.redirectToLogin();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token !== ''),
        take(1),
        switchMap((token) => {
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    }
  }

  private redirectToLogin(): Observable<HttpEvent<unknown>> {
    this.router.navigateByUrl('/login');
    console.error('Token expirado');
    return EMPTY;
  }
}