import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { LoginCredentials } from '@interfaces/auth/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  processingRequest = false;

  form = new FormGroup({
    userName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    public modalController: ModalController
  ) {}

  public login() {
    this.processingRequest = true;

    this.authService
      .login(this.form.value as LoginCredentials)
      .pipe(finalize(() => (this.processingRequest = false)))
      .subscribe({
        next: (response) => {
          if (!response) {
            this._handleUnauthorized();
          }
        },
        error: (err) => {
          console.log('There was an error: ', err);
          this._handleUnauthorized();
        },
      });
  }

  private _handleUnauthorized(): void {
    this.form.setErrors({ invalidCredentials: true });
    this.cdr.markForCheck();
  }
}
