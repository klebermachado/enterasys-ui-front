import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SwitchesService {
  constructor(private http: HttpClient) {}

  async store(sw: any) {
    return new Promise((resolve) => {
      return this.http
        .post(`${environment.apiUrl}/switches`, sw)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }
}
