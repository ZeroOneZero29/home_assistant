import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router, UrlTree } from "@angular/router"

export const accessGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isAuth

  if (isLoggedIn) {
    return true
  }
  return inject(Router).createUrlTree(['/login'])
};

