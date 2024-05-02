import { Component, Input, inject } from '@angular/core';
import { SpinnerDirective } from '../../../shared/directive/spinner.directive';
import { SwitchesService } from '../../../services/switches.service';

@Component({
  selector: 'app-switch-config',
  standalone: true,
  imports: [SpinnerDirective],
  templateUrl: './switch-config.component.html',
  styleUrl: './switch-config.component.css',
})
export class SwitchConfigComponent {
  @Input('id') switchId!: number;

  private switchService = inject(SwitchesService);

  config = 'este é um conteúdo provisório';
  lastUpdate: Date | undefined = undefined;

  async get() {
    const config = await this.switchService.getConfig(this.switchId);
    console.log(config);
    this.config = config.content.trim();
    this.lastUpdate = new Date(config.lastUpdate);
  }
  recover() {}
}
