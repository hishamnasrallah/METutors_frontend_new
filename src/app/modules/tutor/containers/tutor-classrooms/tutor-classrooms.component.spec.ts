import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorClassroomsComponent } from './tutor-classrooms.component';

describe('TutorClassroomsComponent', () => {
  let component: TutorClassroomsComponent;
  let fixture: ComponentFixture<TutorClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorClassroomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
