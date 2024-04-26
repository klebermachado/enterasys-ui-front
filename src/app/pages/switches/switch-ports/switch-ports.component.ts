import { Component, Input, OnInit, inject } from '@angular/core';
import { SwitchesService } from '../../../services/switches.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch-ports',
  standalone: true,
  imports: [SpinnerComponent, ReactiveFormsModule],
  templateUrl: './switch-ports.component.html',
  styleUrl: './switch-ports.component.css',
})
export class SwitchPortsComponent implements OnInit {
  @Input('id') switchId!: number;

  private switchService = inject(SwitchesService);

  sw: any;
  loadingSave: undefined | number = undefined;
  form = new FormGroup({
    alias: new FormControl(''),
    description: new FormControl(''),
  });

  editId?: number;

  async ngOnInit(): Promise<void> {
    const sw = await this.switchService.find(this.switchId);
    this.sw = sw;
  }

  editPort(port: number) {
    this.form.reset();
    this.editId = port;
  }

  async update(port: number) {
    try {
      this.loadingSave = port;
      const portName = this.sw.ports.find((p: any) => p.id === port).portName;
      const ports = await this.switchService.updatePort(this.switchId, {
        ...this.form.value,
        portName,
      });
      this.sw.ports = ports;
    } finally {
      this.loadingSave = undefined;
    }
    this.editId = undefined;
  }
}
