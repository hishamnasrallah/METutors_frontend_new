import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewCertificateComponent } from './student-view-certificate.component';

describe('StudentViewCertificateComponent', () => {
  let component: StudentViewCertificateComponent;
  let fixture: ComponentFixture<StudentViewCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentViewCertificateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
