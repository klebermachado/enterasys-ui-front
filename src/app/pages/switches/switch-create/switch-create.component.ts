import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-create',
  standalone: true,
  imports: [],
  templateUrl: './switch-create.component.html',
  styleUrl: './switch-create.component.css',
})
export class SwitchCreateComponent {
  save() {
    console.log('salvando switch');
  }
}
