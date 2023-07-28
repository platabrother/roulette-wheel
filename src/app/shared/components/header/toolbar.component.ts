import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/login.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public round$!: Observable<number>;
  public appName: string = environment.appName;
  public bettingHouseName: string = 'Casa de Apuestas';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.round$ = of(10);
  }

  public logout(): void {
    this.authService.user = undefined;
    this.router.navigate(['/']);
  }
}
