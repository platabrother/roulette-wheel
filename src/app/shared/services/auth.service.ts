import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url: string = 'http://38.242.243.231:3005/auth/monitor';

  public user!: User | undefined;

  constructor(private readonly http: HttpClient) {}

  public login(username: string, pass: string): Observable<any> {
    const headers = new HttpHeaders({ userName: username, password: pass });

    return this.http.post(
      this.url,
      { userName: username, password: pass },
      { headers }
    );
  }
}
