import { Component, Input, OnInit, inject } from '@angular/core';
import { SwitchesService } from '../../../services/switches.service';

@Component({
  selector: 'app-switch-ports',
  standalone: true,
  imports: [],
  templateUrl: './switch-ports.component.html',
  styleUrl: './switch-ports.component.css',
})
export class SwitchPortsComponent implements OnInit {
  @Input('id') switchId!: number;

  private switchService = inject(SwitchesService);
  sw: any;

  editId?: number;

  async ngOnInit(): Promise<void> {
    const sw = await this.switchService.find(this.switchId);
    this.sw = sw;
  }

  editPort(port: number) {
    this.editId = port;
  }

  update(port: number) {
    this.editId = undefined;
  }
}
