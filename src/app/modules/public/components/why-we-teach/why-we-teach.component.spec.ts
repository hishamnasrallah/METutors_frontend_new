import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyWeTeachComponent } from './why-we-teach.component';

describe('WhyWeTeachComponent', () => {
  let component: WhyWeTeachComponent;
  let fixture: ComponentFixture<WhyWeTeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyWeTeachComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyWeTeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
