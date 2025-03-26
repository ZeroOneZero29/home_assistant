import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  http: HttpClient = inject(HttpClient)
  cookieService: CookieService = inject(CookieService)
  
  baseUrl : string = 'http://localhost:3000/api/auth/'
  
  accessToken : string | null = null;
  refreshToken : string | null = null;


  get isAuth() {
    if (!this.accessToken){
      this.accessToken = this.cookieService.get('token')
    }
    return !!this.accessToken
  }

  login(payload : {email: string, password: string}): any {
    return this.http.post<TokenResponse>(`${this.baseUrl}login`, 
      payload
    ).pipe(tap(val => {
      this.accessToken = val.accessToken
      this.refreshToken = val.refreshToken

      this.cookieService.set('token', this.accessToken)
      this.cookieService.set('refreshToken', this.refreshToken)
      })
    )
  }
}
