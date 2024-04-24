import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlanIndexComponent } from './vlan-index.component';

describe('VlanIndexComponent', () => {
  let component: VlanIndexComponent;
  let fixture: ComponentFixture<VlanIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlanIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VlanIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
