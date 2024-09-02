import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionUserComponent } from './permission-user.component';

describe('PermissionUserComponent', () => {
  let component: PermissionUserComponent;
  let fixture: ComponentFixture<PermissionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
