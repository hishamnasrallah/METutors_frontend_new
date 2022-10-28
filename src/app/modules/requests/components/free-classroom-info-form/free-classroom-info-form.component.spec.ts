import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeClassroomInfoFormComponent } from './free-classroom-info-form.component';

describe('FreeClassroomInfoFormComponent', () => {
  let component: FreeClassroomInfoFormComponent;
  let fixture: ComponentFixture<FreeClassroomInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreeClassroomInfoFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeClassroomInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
