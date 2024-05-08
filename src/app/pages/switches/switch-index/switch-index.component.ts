import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-switch-index',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './switch-index.component.html',
  styleUrl: './switch-index.component.css',
})
export class SwitchIndexComponent {
  @Input('id') switchId!: number;
}
