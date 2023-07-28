import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@services/login.service';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  return authService?.user?.id ? true : false;
};
