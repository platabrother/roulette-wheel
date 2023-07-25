import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  constructor() {}

  public username!: string;
  public password!: string;

  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
