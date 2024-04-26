import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  @Input({ transform: booleanAttribute }) loading: boolean = false;
}
