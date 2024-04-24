import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VlansService {
  constructor() {}

  getVlans() {
    return [
      {
        id: 1,
        tag: '1',
        description: 'VLAN 1',
      },
    ];
  }
}
