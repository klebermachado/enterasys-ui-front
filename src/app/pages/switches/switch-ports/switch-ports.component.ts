import { Component, Input, OnInit, inject } from '@angular/core';
import { SwitchesService } from '../../../services/switches.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { SpinnerDirective } from '../../../shared/directive/spinner.directive';

@Component({
  selector: 'app-switch-ports',
  standalone: true,
  imports: [
    SpinnerComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    SpinnerDirective,
  ],
  templateUrl: './switch-ports.component.html',
  styleUrl: './switch-ports.component.css',
})
export class SwitchPortsComponent implements OnInit {
  @Input('id') switchId!: number;

  private switchService = inject(SwitchesService);

  sw: any;
  portStatus: any[] = [];

  loadingSave: undefined | number = undefined;
  loadingPortStatus = false;
  loadingPortAlias = false;

  form = new FormGroup({
    alias: new FormControl(''),
    description: new FormControl(''),
  });

  editId?: number;

  async ngOnInit(): Promise<void> {
    this.switchService.find(this.switchId).then((sw) => {
      this.sw = sw;
    });
    this.switchService.showPortStatus(this.switchId).then((portStatus) => {
      this.portStatus = portStatus;
    });
  }

  editPort(port: number) {
    this.form.patchValue({
      alias: this.sw.ports.find((p: any) => p.id === port).alias,
      description: this.sw.ports.find((p: any) => p.id === port).description,
    });
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

  async updatePortStatus() {
    try {
      this.loadingPortStatus = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      this.loadingPortStatus = false;
    }
  }
  async updatePortAlias() {
    try {
      this.loadingPortAlias = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      this.loadingPortAlias = false;
    }
  }

  async togglePort(port: number) {
    console.log(port);
  }
}
