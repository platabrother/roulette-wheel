import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { RoundService } from '@services/round.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly roundService: RoundService
  ) {}

  public username!: string;
  public password!: string;

  onSubmit() {
    if (!this.username || !this.password) return;

    this.authService.login(this.username, this.password).subscribe((res) => {
      this.authService.user = { ...res.user, pass: this.password };

      this.roundService.getNextRound();
      this.router.navigate(['/home']);
    });
  }
}
