import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Buffer } from 'buffer';
import { environment } from '@environments/environment';
import { BearerToken } from '@interfaces/connection-api/bearer-token.interface';
import { HttpUtils } from '@services/http-utils/http-utils';
import { StorageService } from 'src/core/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private httpUtils: HttpUtils, private storage: StorageService) {}

  public getTokenConnection(forceRefresh = false): Observable<string> {
    if (!forceRefresh) {
      const token = this.storage.getItem('bearer_token');
      if (token) return of(token);
    }

    const creds = Buffer.from(environment.tokenReader, 'base64').toString(
      'binary'
    );
    const [userName, password] = creds.split(':');
    const credentials = { userName, password };
    return this.httpUtils
      .post<BearerToken>('bearerToken', {}, credentials)
      .pipe(
        map((res) => {
          this.storage.setItem('bearer_token', res.token);
          return res.token;
        })
      );
  }
}
