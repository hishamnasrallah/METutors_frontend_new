import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyMetutorsComponent } from './why-metutors.component';

describe('WhyMetutorsComponent', () => {
  let component: WhyMetutorsComponent;
  let fixture: ComponentFixture<WhyMetutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyMetutorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyMetutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
