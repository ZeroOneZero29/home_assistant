import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);
  router: Router = inject(Router);
  baseUrl: string = 'http://localhost:3000/api/auth/';

  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.accessToken;
  }

  login(payload: { email: string; password: string }): any {
    return this.http.post<TokenResponse>(`${this.baseUrl}login`, payload).pipe(
      tap((val) => {
        this.saveTokens(val);
      }),
    );
  }

  regestration(payload: { name: string; email: string; password: string }): any {
    return this.http.post(`${this.baseUrl}reg`, payload);
  }

  //headerDict = {
  //  Authorization: `Bearer ${this.refreshToken}`,
  //};

  //requestOptions = {
  //  headers: new HttpParams(this.headerDict),
  //};
  baseHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.refreshToken}`);

  refreshAuthToken() {
    return this.http
      .get<TokenResponse>(`${this.baseUrl}refresh`, {
        headers: {
          // prettier-ignore
          "Authorization": `fkkfk`,
        },
      })
      .pipe(
        tap((val) => {
          this.saveTokens(val);
        }),
        catchError((err) => {
          this.logout();
          return throwError(err);
        }),
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.createUrlTree(['login']);
  }

  saveTokens(res: TokenResponse) {
    this.accessToken = res.accessToken;
    this.refreshToken = res.refreshToken;

    this.cookieService.set('token', this.accessToken);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
