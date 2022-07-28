import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorViewKudosPointsDetailComponent } from './tutor-view-kudos-points-detail.component';

describe('TutorViewKudosPointsDetailComponent', () => {
  let component: TutorViewKudosPointsDetailComponent;
  let fixture: ComponentFixture<TutorViewKudosPointsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorViewKudosPointsDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorViewKudosPointsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
