import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorResourcesComponent } from './tutor-resources.component';

describe('TutorResourcesComponent', () => {
  let component: TutorResourcesComponent;
  let fixture: ComponentFixture<TutorResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorResourcesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
