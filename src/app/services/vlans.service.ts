import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VlansService {
  vlans = signal<any[]>([]);
  constructor(private http: HttpClient) {
    this.getVlans();
  }

  getVlans(): Promise<any[]> {
    return new Promise((resolve) => {
      this.http.get(`${environment.apiUrl}/vlans`).subscribe((data: any) => {
        this.vlans.set(data.sort((a: any, b: any) => a.tag - b.tag));
        resolve(data);
      });
    });
  }

  async store(vlan: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.apiUrl}/vlans`, vlan)
        .pipe(
          catchError((error) => {
            reject('Error creating VLAN');
            return throwError(() => new Error('Error creating VLAN'));
          })
        )
        .subscribe((data) => {
          this.getVlans();
          resolve(data);
        });
    });
  }

  async delete(id: number) {
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/vlans/${id}`)
        .subscribe((data) => {
          this.getVlans();
          resolve(data);
        });
    });
  }
}
