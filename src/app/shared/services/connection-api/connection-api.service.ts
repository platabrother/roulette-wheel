import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Buffer } from 'buffer';
import { environment } from '@environments/environment';
import { BearerToken } from '@interfaces/connection-api/bearer-token.interface';
import { HttpUtils } from '@services/http-utils/http-utils';
import { StorageService } from 'src/core/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor(private httpUtils: HttpUtils, private storage: StorageService) {}

  public getTokenConnection(): Observable<string> {
    const token = this._getTokenFromStorage();
    if (token) {
      return of(token);
    } else {
      const credentials = this._getCredentials();
      return this._getTokenFromServer(credentials);
    }
  }

  private _getTokenFromStorage(): string {
    return this.storage.getItem('bearer_token') || '';
  }

  private _getCredentials(): { userName: string; password: string } {
    const creds = Buffer.from(environment.tokenReader, 'base64').toString('binary');
    const [userName, password] = creds.split(':');
    return { userName, password };
  }

  private _getTokenFromServer(credentials: { userName: string; password: string }): Observable<string> {
    return this.httpUtils.post<BearerToken>('bearerToken', {}, credentials).pipe(
      map((res) => {
        this.storage.setItem('bearer_token', res.token);
        return res.token;
      })
    );
  }
}
