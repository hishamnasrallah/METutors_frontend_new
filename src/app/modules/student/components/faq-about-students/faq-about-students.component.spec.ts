import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAboutStudentsComponent } from './faq-about-students.component';

describe('FaqAboutStudentsComponent', () => {
  let component: FaqAboutStudentsComponent;
  let fixture: ComponentFixture<FaqAboutStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqAboutStudentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAboutStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
