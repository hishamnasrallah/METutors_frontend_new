import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeTutorsUsComponent } from './become-tutors-us.component';

describe('BecomeTutorsUsComponent', () => {
  let component: BecomeTutorsUsComponent;
  let fixture: ComponentFixture<BecomeTutorsUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BecomeTutorsUsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeTutorsUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
