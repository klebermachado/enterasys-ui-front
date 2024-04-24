import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchIndexComponent } from './switch-index.component';

describe('SwitchIndexComponent', () => {
  let component: SwitchIndexComponent;
  let fixture: ComponentFixture<SwitchIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitchIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
