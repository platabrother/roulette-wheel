import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly url: string = 'http://38.242.243.231:3005/auth/monitor';

  constructor(private readonly http: HttpClient) {}

  public login(username: string, pass: string): Observable<any> {
    const headers = new HttpHeaders({
      userName: username,
      password: pass,
    });

    return this.http.post(this.url, { headers });
  }
}
