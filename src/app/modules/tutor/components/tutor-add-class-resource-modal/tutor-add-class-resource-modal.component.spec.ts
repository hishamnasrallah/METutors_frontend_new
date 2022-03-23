import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAddClassResourceModalComponent } from './tutor-add-class-resource-modal.component';

describe('TutorAddClassResourceModalComponent', () => {
  let component: TutorAddClassResourceModalComponent;
  let fixture: ComponentFixture<TutorAddClassResourceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorAddClassResourceModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAddClassResourceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
