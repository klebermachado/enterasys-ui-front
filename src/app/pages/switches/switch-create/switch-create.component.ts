import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchesService } from '../../../services/switches.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-switch-create',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './switch-create.component.html',
  styleUrl: './switch-create.component.css',
})
export class SwitchCreateComponent {
  private switchService = inject(SwitchesService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  loading = false;

  form = new FormGroup({
    name: new FormControl(''),
    ip: new FormControl(''),
    hostname: new FormControl(''),
    location: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
  });

  async save() {
    this.loading = true;
    const sw: any = await this.switchService.store(this.form.value);
    console.log(sw);
    this.toastr.success('Switch created successfully');
    this.form.reset();
    this.loading = false;
    this.router.navigate(['/switches', sw.id]);
  }
}
