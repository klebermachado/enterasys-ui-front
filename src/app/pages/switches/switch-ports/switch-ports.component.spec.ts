import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchPortsComponent } from './switch-ports.component';

describe('SwitchPortsComponent', () => {
  let component: SwitchPortsComponent;
  let fixture: ComponentFixture<SwitchPortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchPortsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitchPortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
