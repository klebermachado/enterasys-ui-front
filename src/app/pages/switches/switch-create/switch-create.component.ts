import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchesService } from '../../../services/switches.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-switch-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './switch-create.component.html',
  styleUrl: './switch-create.component.css',
})
export class SwitchCreateComponent {
  private switchService = inject(SwitchesService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  form = new FormGroup({
    name: new FormControl(''),
    ip: new FormControl(''),
    hostname: new FormControl(''),
    location: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
  });

  async save() {
    const sw: any = await this.switchService.store(this.form.value);
    this.toastr.success('Switch created successfully');
    this.form.reset();
    this.router.navigate(['/switches', sw.id]);
  }
}
