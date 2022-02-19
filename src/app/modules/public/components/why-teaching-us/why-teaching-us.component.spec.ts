import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyTeachingUsComponent } from './why-teaching-us.component';

describe('WhyTeachingUsComponent', () => {
  let component: WhyTeachingUsComponent;
  let fixture: ComponentFixture<WhyTeachingUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyTeachingUsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyTeachingUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
