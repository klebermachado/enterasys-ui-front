import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBackupComponent } from './switch-backup.component';

describe('SwitchBackupComponent', () => {
  let component: SwitchBackupComponent;
  let fixture: ComponentFixture<SwitchBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchBackupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitchBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
