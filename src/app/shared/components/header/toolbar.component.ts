import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Round } from '@interfaces/rounds/round.interface';
import { AuthService } from '@services/auth/auth.service';
import { RoundService } from '@services/round.service';
import { Subscription, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private subNextRound!: Subscription;

  public nextRound!: Round | null;
  public appName: string = environment.appName;
  public bettingHouseName: string = 'Casa de Apuestas';

  public isLoginPage: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly roundService: RoundService
  ) {}

  ngOnInit(): void {
    this.subNextRound = this.roundService.roundList$
      .pipe(map((res: Round[]) => res[0]))
      .subscribe((res: Round) => (this.nextRound = { ...res }));

    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        const currentUrl: string = res.urlAfterRedirects;
        this.isLoginPage = currentUrl === '/login';
      }
    });
  }

  public logout(): void {
    this.authService.logout();
    this.roundService.clearNextRound();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subNextRound.unsubscribe();
  }
}
