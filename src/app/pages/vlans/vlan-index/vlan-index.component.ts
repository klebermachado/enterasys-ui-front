import { Component, OnInit, inject } from '@angular/core';
import { generateRandomID } from '../../../helpers/utils';
import { VlansService } from '../../../services/vlans.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-vlan-index',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './vlan-index.component.html',
  styleUrl: './vlan-index.component.css',
})
export class VlanIndexComponent implements OnInit {
  private vlanService = inject(VlansService);
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
  }

  async save() {
    try {
      this.isLoading = true;
      await this.vlanService.store(this.form.value);
      this.vlans = await this.vlanService.getVlans();
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
