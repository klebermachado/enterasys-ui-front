import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureIndexComponent } from './architecture-index.component';

describe('ArchitectureIndexComponent', () => {
  let component: ArchitectureIndexComponent;
  let fixture: ComponentFixture<ArchitectureIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchitectureIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
