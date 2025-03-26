import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing: boolean = false;
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;
  if (!token) return next(req);

  if (isRefreshing) {
    return refreshAndProcced(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error.status == 401) {
        return refreshAndProcced(authService, req, next);
      }
      return throwError(error);
    }),
  );
};

const refreshAndProcced = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  if (!isRefreshing) {
    isRefreshing = true;
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        isRefreshing = false;
        return next(addToken(req, res.accessToken));
      }),
    );
  }
  return next(addToken(req, authService.accessToken!));
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
