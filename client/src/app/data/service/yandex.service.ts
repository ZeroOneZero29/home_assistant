import { inject, Injectable } from '@angular/core';
import { YandexToken } from '../interface/yandex.token.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class YandexService {
  http: HttpClient = inject(HttpClient);
  baseUrl: string = 'http://localhost:3000/api/auth/';
  postTokenYandex(res: YandexToken) {
    console.log(res.access_token);
    const postToken = { oauthToken: res.access_token };
    console.log(postToken);
    return this.http.post(`http://localhost:3000/api/auth/oauth`, postToken).subscribe();
  }
}
