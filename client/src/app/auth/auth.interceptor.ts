import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from 'rxjs';

let isRefreshing$ = new BehaviorSubject<boolean>(false);
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;
  const refreshToken = authService.refreshToken;
  if (!token) return next(req);

  if (isRefreshing$.value) {
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
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        isRefreshing$.next(false);
        return next(addToken(req, res.accessToken));
      }),
    );
  }
  if (req.url.includes('refresh')) return next(addToken(req, authService.accessToken!));
  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    switchMap((res) => {
      return next(addToken(req, authService.accessToken!)).pipe(
        tap(() => {
          isRefreshing$.next(false);
        }),
      );
    }),
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
