import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustHappyStudentsComponent } from './trust-happy-students.component';

describe('TrustHappyStudentsComponent', () => {
  let component: TrustHappyStudentsComponent;
  let fixture: ComponentFixture<TrustHappyStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrustHappyStudentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustHappyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
