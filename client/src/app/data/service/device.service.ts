import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  http: HttpClient = inject(HttpClient)
  baseUrl = 'http://localhost:3000/api/device/'
  getAllDevice() {
    return this.http.get(`${this.baseUrl}info`)
  }
}
