import { Component, inject } from '@angular/core';
import { generateRandomID } from '../../../helpers/utils';
import { VlansService } from '../../../services/vlans.service';

@Component({
  selector: 'app-vlan-index',
  standalone: true,
  imports: [],
  templateUrl: './vlan-index.component.html',
  styleUrl: './vlan-index.component.css',
})
export class VlanIndexComponent {
  private vlanService = inject(VlansService);
  vlans = this.vlanService.getVlans();
  generateRanndomID = generateRandomID;

  isLoading = false;
  spinnerDelete?: number;

  save() {
    console.log('Save');
    this.isLoading = true;
  }

  delete(id: number) {
    this.spinnerDelete = id;
    console.log('deletando');
  }
}
