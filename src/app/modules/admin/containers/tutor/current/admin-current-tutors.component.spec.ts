import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCurrentTutorsComponent } from './admin-current-tutors.component';

describe('AdminCurrentTutorsComponent', () => {
  let component: AdminCurrentTutorsComponent;
  let fixture: ComponentFixture<AdminCurrentTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCurrentTutorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCurrentTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
