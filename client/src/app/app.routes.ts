import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DevicePageComponent } from './pages/device-page/device-page.component';
import { accessGuard } from './auth/access.guard';


export const routes: Routes = [
  { 
    path: 'device',
    component: DevicePageComponent,
    canActivate: [accessGuard]
  },

  { path: '',
    component: MainPageComponent,
    title: ''
  },

  {
    path: 'login',
    component: LoginPageComponent,
    title: 'login'
  },
  
  {
    path: 'reg',
    component: RegPageComponent,
    title: 'regestration'
  },



];
