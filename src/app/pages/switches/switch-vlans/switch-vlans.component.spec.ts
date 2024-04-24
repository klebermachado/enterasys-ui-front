import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchVlansComponent } from './switch-vlans.component';

describe('SwitchVlansComponent', () => {
  let component: SwitchVlansComponent;
  let fixture: ComponentFixture<SwitchVlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchVlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitchVlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
