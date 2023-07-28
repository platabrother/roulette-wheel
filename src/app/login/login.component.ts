import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  public username!: string;
  public password!: string;

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe((res) => {
      this.authService.user = res.user;
      this.router.navigate(['/home']);
    });
  }
}
