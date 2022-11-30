import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFreeTutorComponent } from './request-free-tutor.component';

describe('RequestFreeTutorComponent', () => {
  let component: RequestFreeTutorComponent;
  let fixture: ComponentFixture<RequestFreeTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestFreeTutorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFreeTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
