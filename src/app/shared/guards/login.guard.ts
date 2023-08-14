import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  return authService.user$.pipe(map((user) => !!user?.id));
};
