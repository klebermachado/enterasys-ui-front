import { Component, Input, OnInit, inject } from '@angular/core';
import { SpinnerDirective } from '../../../shared/directive/spinner.directive';
import { SwitchesService } from '../../../services/switches.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-switch-config',
  standalone: true,
  imports: [SpinnerDirective, DatePipe],
  templateUrl: './switch-config.component.html',
  styleUrl: './switch-config.component.css',
})
export class SwitchConfigComponent implements OnInit {
  @Input('id') switchId!: number;

  private switchService = inject(SwitchesService);
  private toastr = inject(ToastrService);

  loadingSync = false;
  loadingRecover = false;

  config = 'este é um conteúdo provisório';
  lastUpdate: Date | undefined = undefined;

  async ngOnInit(): Promise<void> {
    const config = await this.switchService.getConfig(this.switchId);
    this.config = config.content.trim();
    this.lastUpdate = new Date(config.updatedAt);
  }

  async get() {
    try {
      this.loadingSync = true;
      const config = await this.switchService.getConfigAndSync(this.switchId);
      this.config = config.content.trim();
      this.lastUpdate = new Date(config.updatedAt);
    } catch (error: any) {
      this.toastr.error(error);
    } finally {
      this.loadingSync = false;
      this.toastr.success('Synchronized configuration');
    }
  }
  recover() {}
}
