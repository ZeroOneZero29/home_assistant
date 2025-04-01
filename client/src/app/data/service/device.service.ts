import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AllDevice } from '../interface/device.interface';
import { catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  baseUrl = 'http://localhost:3000/api/device/';
  getAllDevice() {
    return this.http.get<AllDevice>(`${this.baseUrl}info`).pipe(
      //@ts-ignore
      catchError((error) => {
        if (error.status == 403) {
          this.router.navigate(['oauth']);
        }
      }),
    );
  }
}
