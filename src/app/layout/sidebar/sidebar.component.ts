import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SwitchesService } from '../../services/switches.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private switchService = inject(SwitchesService);
  switches = this.switchService.switches;

  async ngOnInit(): Promise<void> {}
}
