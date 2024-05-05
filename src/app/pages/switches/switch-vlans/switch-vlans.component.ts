import { Component, inject } from '@angular/core';
import { VlansService } from '../../../services/vlans.service';
import { generateRandomID } from '../../../shared/utils/helpers';

@Component({
  selector: 'app-switch-vlans',
  standalone: true,
  imports: [],
  templateUrl: './switch-vlans.component.html',
  styleUrl: './switch-vlans.component.css',
})
export class SwitchVlansComponent {
  private vlanService = inject(VlansService);
  vlans = this.vlanService.vlans;

  ports = [
    {
      id: 1,
      portName: 'ge.1.1',
      alias: 'PPAP1',
      description: 'Rádio convivência',
      isLink: false,
      vlan: { id: 1, tag: '1120', description: 'Administrativo' },
      egress: [
        { id: 1, tag: '22', description: 'Administrativo' },
        { id: 2, tag: '234', description: 'Público' },
        { id: 3, tag: '2323', description: 'TIC' },
      ],
    },
    {
      id: 2,
      portName: 'ge.1.2',
      alias: 'PPAP2',
      description: 'Rádio convivência, 3º andar',
      isLink: true,
      vlan: { id: 1, tag: '1120', description: 'Administrativo' },
      egress: [
        { id: 1, tag: '22', description: 'Administrativo' },
        { id: 2, tag: '234', description: 'Público' },
        { id: 3, tag: '2323', description: 'TIC' },
      ],
    },
  ];

  addEgress(portId: number) {
    const index = this.ports.findIndex((port) => port.id === portId);
    const id = generateRandomID();
    this.ports[index].egress.push({ id: id, local: true } as any);
  }

  removeEgress(portId: number, egressId: number) {
    const index = this.ports.findIndex((port) => port.id === portId);
    const egressIndex = this.ports[index].egress.findIndex(
      (egress) => egress.id === egressId
    );
    this.ports[index].egress.splice(egressIndex, 1);
  }
}
