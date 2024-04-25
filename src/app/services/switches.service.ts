import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SwitchesService {
  switches = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.getAll();
  }

  async getAll(): Promise<any> {
    return new Promise((resolve) => {
      return this.http
        .get(`${environment.apiUrl}/switches`)
        .subscribe((response) => {
          this.switches.set(response as any[]);
          resolve(response);
        });
    });
  }

  async store(sw: any) {
    return new Promise((resolve) => {
      return this.http
        .post(`${environment.apiUrl}/switches`, sw)
        .subscribe((response) => {
          resolve(response);
          this.getAll();
        });
    });
  }
}
