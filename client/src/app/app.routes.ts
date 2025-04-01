import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DevicePageComponent } from './pages/device-page/device-page.component';
import { accessGuard } from './auth/access.guard';
import { OauthPageComponent } from './pages/oauth-page/oauth-page.component';
import { OauthPageRedirectComponent } from './pages/oauth-page-redirect/oauth-page-redirect.component';
import { LayoutComponent } from './common-ui/layout/layout.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent, title: '' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'device',
        component: DevicePageComponent,
        canActivate: [accessGuard],
      },
    ],
  },

  {
    path: 'login',
    component: LoginPageComponent,
    title: 'login',
  },

  {
    path: 'reg',
    component: RegPageComponent,
    title: 'regestration',
  },

  {
    path: 'oauth',
    component: OauthPageComponent,
    title: 'oauth',
    canActivate: [accessGuard],
  },

  {
    path: 'oauth-redirect',
    component: OauthPageRedirectComponent,
    title: 'oauth-redirect',
  },
];
