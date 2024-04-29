import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

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

  async find(id: number) {
    return new Promise((resolve) => {
      return this.http
        .get(`${environment.apiUrl}/switches/${id}`)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  async store(sw: any) {
    return new Promise((resolve, reject) => {
      return this.http
        .post(`${environment.apiUrl}/switches`, sw)
        .pipe(
          catchError((error: any) => {
            reject('Switch unreachable');
            return throwError(() => new Error('Switch unreachable'));
          })
        )
        .subscribe((response) => {
          resolve(response);
          this.getAll();
        });
    });
  }

  async updatePort(switchId: number, dataPort: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/switches/${switchId}/ports`, dataPort)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  async showPortStatus(switchId: number): Promise<any[]> {
    return new Promise((resolve) => {
      this.http
        .get(`${environment.apiUrl}/switches/${switchId}/ports/status`)
        .subscribe((response) => {
          resolve(response as any[]);
        });
    });
  }

  async togglePort(swId: number, portName: string, toggle: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${environment.apiUrl}/switches/${swId}/ports/${portName}/toggle`,
          { toggle }
        )
        .pipe(
          catchError((error: any) => {
            reject('unable to modify port status');
            return throwError(() => new Error('unable to modify port status'));
          })
        )
        .subscribe((response) => {
          resolve(response);
        });
    });
  }
}
