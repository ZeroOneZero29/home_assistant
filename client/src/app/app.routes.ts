import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LineLayoutComponent } from './common-ui/layout/line-layout/line-layout.component';

export const routes: Routes = [

  { path: '',
    component: MainPageComponent,
    title: ''
  },
  {path: '',
    component: LineLayoutComponent,
    children: [
    {
      path: 'login',
      component: LoginPageComponent,
      title: 'login'
    },
    {
      path: 'reg',
      component: RegPageComponent,
      title: 'regestration'
    }]
  },

];
