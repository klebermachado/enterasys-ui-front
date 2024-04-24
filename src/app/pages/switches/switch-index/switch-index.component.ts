import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-switch-index',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './switch-index.component.html',
  styleUrl: './switch-index.component.css',
})
export class SwitchIndexComponent {
  id: number = 2;
}
