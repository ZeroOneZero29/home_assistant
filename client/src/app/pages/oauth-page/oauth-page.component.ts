import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { YandexToken } from '../../data/interface/yandex.token.interface';
import { Router } from '@angular/router';
import { YandexService } from '../../data/service/yandex.service';
import { OauthHandler } from '../../data/interface/yandex.oauth.interface';

@Component({
  selector: 'app-oauth-page',
  imports: [CommonModule],
  templateUrl: './oauth-page.component.html',
  styleUrl: './oauth-page.component.scss',
})
export class OauthPageComponent {
  constructor(private renderer: Renderer2) {}
  router = inject(Router);
  yandexService = inject(YandexService);
  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit() {
    this.addJsToElement(
      'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js',
    ).onload = () => {
      this.initializationYandex();
      console.log('Yandex script loaded');
    };
  }
  initializationYandex() {
    //@ts-ignore
    let resultYandex = YaAuthSuggest.init(
      {
        client_id: 'cf61ec204d874551a1a812d166d421b7',
        response_type: 'token',
        redirect_uri: 'http://localhost:4200/oauth-redirect',
      },
      'http://localhost:4200/oauth-redirect',
      {
        view: 'button',
        parentId: 'container-link',
        buttonView: 'main',
        buttonTheme: 'dark',
        buttonSize: 'm',
        buttonBorderRadius: 9,
      },
    ).then(function (result: OauthHandler) {
      return result.handler();
    });
    resultYandex
      .then((res: YandexToken) => {
        this.yandexService.postTokenYandex(res);
        this.router.navigate(['device']);
      })
      .catch((err: any) => {
        console.log('Что-то пошло не так: ', err);
      });
  }

  //ngAfterContentInit() {
  //  window.onload = () => {
  //    //@ts-ignore
  //    const res = YaAuthSuggest.init(
  //      {
  //        client_id: 'cf61ec204d874551a1a812d166d421b7',
  //        response_type: 'token',
  //        redirect_uri: 'http://localhost:4200/oauth-redirect',
  //      },
  //      'http://localhost:4200/oauth-redirect',
  //      {
  //        view: 'button',
  //        parentId: 'container-link',
  //        buttonView: 'main',
  //        buttonTheme: 'dark',
  //        buttonSize: 'm',
  //        buttonBorderRadius: 9,
  //      },
  //    ).then(function (result: any) {
  //      return result.handler();
  //    });
  //    res
  //      .then((res: YandexToken) => {
  //        this.yandexService.postTokenYandex(res);
  //        this.router.navigate(['device']);
  //      })
  //      .catch((err: any) => {
  //        console.log('Что-то пошло не так: ', err);
  //      });
  //  };
  //}
}
