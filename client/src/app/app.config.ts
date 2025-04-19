import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './auth/auth.interceptor';
import { ImgDevicePipe } from './helpers/img-device.pipe';
import { ImgDeviceOffPipe } from './helpers/img-device-off.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    ImgDevicePipe,
    ImgDeviceOffPipe,
  ],
};
