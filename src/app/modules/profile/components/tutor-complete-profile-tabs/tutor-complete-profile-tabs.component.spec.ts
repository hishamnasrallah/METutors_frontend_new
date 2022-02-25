import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCompleteProfileTabsComponent } from './tutor-complete-profile-tabs.component';

describe('TutorCompleteProfileTabsComponent', () => {
  let component: TutorCompleteProfileTabsComponent;
  let fixture: ComponentFixture<TutorCompleteProfileTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorCompleteProfileTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCompleteProfileTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
