import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchesService } from '../../../services/switches.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SpinnerDirective } from '../../../shared/directive/spinner.directive';

@Component({
  selector: 'app-switch-create',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, SpinnerDirective],
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
    try {
      this.loading = true;
      const sw: any = await this.switchService.store(this.form.value);
      this.toastr.success('Switch created successfully');
      this.form.reset();
      this.router.navigate(['/switches', sw.id]);
    } catch (error: any) {
      this.toastr.error(error);
    } finally {
      this.loading = false;
    }
  }
}
