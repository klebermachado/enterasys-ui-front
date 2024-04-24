import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchCreateComponent } from './switch-create.component';

describe('SwitchCreateComponent', () => {
  let component: SwitchCreateComponent;
  let fixture: ComponentFixture<SwitchCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitchCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
