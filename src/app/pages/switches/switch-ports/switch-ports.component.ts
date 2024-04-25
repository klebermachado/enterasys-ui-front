import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-ports',
  standalone: true,
  imports: [],
  templateUrl: './switch-ports.component.html',
  styleUrl: './switch-ports.component.css',
})
export class SwitchPortsComponent {
  editId?: number;

  editPort(port: number) {
    this.editId = port;
  }

  update(port: number) {
    this.editId = undefined;
  }
}
