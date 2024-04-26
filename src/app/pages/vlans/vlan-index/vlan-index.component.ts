import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { generateRandomID } from '../../../helpers/utils';
import { VlansService } from '../../../services/vlans.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vlan-index',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './vlan-index.component.html',
  styleUrl: './vlan-index.component.css',
})
export class VlanIndexComponent implements OnInit {
  private vlanService = inject(VlansService);
  private toastr = inject(ToastrService);

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  vlans: any[] = [];
  generateRanndomID = generateRandomID;

  isLoading = false;
  spinnerDelete?: number;

  form = new FormGroup({
    tag: new FormControl(''),
    description: new FormControl(''),
  });

  async ngOnInit(): Promise<void> {
    this.vlans = await this.vlanService.getVlans();
    setTimeout(() => {
      this.tagInput.nativeElement.focus();
    }, 1000);
  }

  async save() {
    try {
      this.isLoading = true;
      await this.vlanService.store(this.form.value);
      this.vlans = await this.vlanService.getVlans();
      this.form.reset();
      this.tagInput.nativeElement.focus();
      this.toastr.success('VLAN created successfully');
    } finally {
      this.isLoading = false;
    }
  }

  async delete(id: number) {
    this.spinnerDelete = id;
    await this.vlanService.delete(id);
    this.vlans = await this.vlanService.getVlans();
    this.spinnerDelete = undefined;
  }
}
