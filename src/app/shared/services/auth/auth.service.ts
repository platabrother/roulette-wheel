import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  catchError,
  switchMap,
} from 'rxjs';
import { HttpUtils } from '../http-utils/http-utils';
import { StorageService } from '@storage/storage.service';
import { API_KEY_CONNECTION } from '@services/http-utils/apis-url';
import {
  LoginCredentials,
  UserWithToken,
} from '@interfaces/auth/auth.interface';

const USER_STORAGE_KEY = 'userData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLogged$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(
    private httpUtils: HttpUtils,
    private router: Router,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this._loadUserFromLocalStorage();
  }

  public login(
    credentials: LoginCredentials
  ): Observable<UserWithToken | null> {
    return this.httpUtils
      .post<LoginCredentials>(API_KEY_CONNECTION.GET_TOKEN, {}, credentials)
      .pipe(
        switchMap((usersData: LoginCredentials) => {
          if (usersData) {
            const userWithToken = this._createUserWithToken(usersData);
            this._saveTokenToLocalStore(userWithToken.token);
            this._pushNewUser(userWithToken.token);
            this._redirectToDashboard();
            return of(userWithToken);
          } else {
            console.error('User not found in database');
            return of(null);
          }
        }),
        catchError((error) => {
          console.error('Failed to login:', error);
          return of(null);
        })
      );
  }

  private _createUserWithToken(user: LoginCredentials): UserWithToken {
    const userTokenStr = btoa(JSON.stringify(user));
    return {
      ...user,
      token: userTokenStr,
    };
  }

  private _pushNewUser(encodedToken: string) {
    this.user.next(this._decodeToken(encodedToken));
  }

  private _decodeToken(encodedToken: string): UserWithToken {
    let userInfo!: LoginCredentials;

    if (isPlatformBrowser(this.platformId)) {
      const windowsRef = window;
      try {
        if (windowsRef) {
          userInfo = JSON.parse(
            windowsRef.atob(encodedToken)
          ) as LoginCredentials;
        }
      } catch (error) {
        console.error('Failed to decode user token:', error);
      }
    }

    return { ...userInfo, token: encodedToken };
  }

  private _loadUserFromLocalStorage(): void {
    const userFromLocal = isPlatformBrowser(this.platformId)
      ? localStorage.getItem(USER_STORAGE_KEY)
      : this.storageService.getItem(USER_STORAGE_KEY);
    userFromLocal && this._pushNewUser(userFromLocal);
  }

  private _saveTokenToLocalStore(userToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(USER_STORAGE_KEY, userToken);
    } else if (isPlatformServer(this.platformId)) {
      this.storageService.setItem(USER_STORAGE_KEY, userToken);
    }
  }

  public logout(): void {
    this._removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/home');
  }

  private _redirectToDashboard(): void {
    this.router.navigateByUrl('/home');
  }

  private _removeUserFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(USER_STORAGE_KEY);
    } else if (isPlatformServer(this.platformId)) {
      this.storageService.removeItem(USER_STORAGE_KEY);
    }
  }
}
