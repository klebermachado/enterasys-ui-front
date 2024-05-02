import { Component, Input, OnInit, inject } from '@angular/core';
import { SwitchesService } from '../../../services/switches.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { SpinnerDirective } from '../../../shared/directive/spinner.directive';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-switch-ports',
  standalone: true,
  imports: [
    SpinnerComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    SpinnerDirective,
    NgClass,
  ],
  templateUrl: './switch-ports.component.html',
  styleUrl: './switch-ports.component.css',
})
export class SwitchPortsComponent implements OnInit {
  @Input('id') switchId!: number;

  private switchService = inject(SwitchesService);
  private toastr = inject(ToastrService);

  sw: any;
  portStatus: any[] = [];

  loadingSave: undefined | number = undefined;
  loadingPortStatus = false;
  loadingPortAlias = false;
  loadingTogglePortName: undefined | string = undefined;

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
      this.portStatus = await this.switchService.showPortStatus(this.switchId);
    } catch (error: any) {
      this.toastr.error(error);
    } finally {
      this.loadingPortStatus = false;
    }
  }
  async updatePortAlias() {
    try {
      this.loadingPortAlias = true;
      this.sw.ports = await this.switchService.syncPorts(this.switchId);
    } finally {
      this.loadingPortAlias = false;
    }
  }

  async togglePort(portName: string) {
    try {
      const portStatus = this.portStatus.find((p) => p.portName === portName);
      let toggle =
        portStatus.adminStatus.toLowerCase() === 'up' ? 'down' : 'up';
      this.loadingTogglePortName = portName;
      const portStatusResponse = await this.switchService.togglePort(
        this.switchId,
        portName,
        toggle
      );
      this.portStatus = this.portStatus.map((p) =>
        p.portName === portName ? portStatusResponse : p
      );
    } catch (error: any) {
      this.toastr.error(error);
    } finally {
      this.loadingTogglePortName = undefined;
    }
  }
}
