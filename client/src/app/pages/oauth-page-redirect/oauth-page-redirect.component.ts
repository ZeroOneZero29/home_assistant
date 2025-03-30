import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-oauth-page-redirect',
  imports: [],
  templateUrl: './oauth-page-redirect.component.html',
  styleUrl: './oauth-page-redirect.component.scss',
})
export class OauthPageRedirectComponent {
  constructor(private renderer: Renderer2) {}

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit() {
    this.addJsToElement(
      'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js  ',
    ).onload = () => {
      console.log('SkyScanner Tag loaded');
    };

    window.onload = function () {
      //@ts-ignore
      window.YaSendSuggestToken('http://localhost:4200/oauth', {
        kek: true,
      });
    };
  }
}
