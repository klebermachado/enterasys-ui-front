import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VlansService {
  constructor(private http: HttpClient) {}

  getVlans(): Promise<any[]> {
    return new Promise((resolve) => {
      this.http.get(`${environment.apiUrl}/vlans`).subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  async store(vlan: any) {
    return new Promise((resolve) => {
      this.http.post(`${environment.apiUrl}/vlans`, vlan).subscribe((data) => {
        resolve(data);
      });
    });
  }

  async delete(id: number) {
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/vlans/${id}`)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
}
