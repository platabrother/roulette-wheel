import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Round } from '@interfaces/rounds/round.interface';
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
    this.authService.login(this.username, this.password).subscribe((res) => {
      this.authService.user = { ...res.user, pass: this.password };

      this.roundService.getNextRound();
      this.router.navigate(['/home']);
    });
  }
}
