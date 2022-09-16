import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninEmailVerificationModalComponent } from './signin-email-verification-modal.component';

describe('SigninEmailVerificationModalComponent', () => {
  let component: SigninEmailVerificationModalComponent;
  let fixture: ComponentFixture<SigninEmailVerificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninEmailVerificationModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninEmailVerificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
