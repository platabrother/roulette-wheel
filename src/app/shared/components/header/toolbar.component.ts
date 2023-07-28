import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Round } from '@interfaces/rounds/round.interface';
import { AuthService } from '@services/login.service';
import { RoundService } from '@services/round.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public nextRound!: Round | null;
  public appName: string = environment.appName;
  public bettingHouseName: string = 'Casa de Apuestas';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly roundService: RoundService
  ) {}

  ngOnInit(): void {
    this.roundService.nextRound$.subscribe((res) => {
      this.nextRound = res;
    });
  }

  public logout(): void {
    this.authService.user = undefined;
    this.roundService.clearNextRound();
    this.router.navigate(['/']);
  }
}
