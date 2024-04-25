import { Component, inject } from '@angular/core';
import { VlansService } from '../../../services/vlans.service';

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
}
