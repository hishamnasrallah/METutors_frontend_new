import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorClassDashboardComponent } from './tutor-class-dashboard.component';

describe('TutorClassDashboardComponent', () => {
  let component: TutorClassDashboardComponent;
  let fixture: ComponentFixture<TutorClassDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorClassDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorClassDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
