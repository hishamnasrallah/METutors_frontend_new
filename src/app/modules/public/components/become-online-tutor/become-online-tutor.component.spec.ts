import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeOnlineTutorComponent } from './become-online-tutor.component';

describe('BecomeOnlineTutorComponent', () => {
  let component: BecomeOnlineTutorComponent;
  let fixture: ComponentFixture<BecomeOnlineTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BecomeOnlineTutorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeOnlineTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
