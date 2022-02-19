import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovativeApproachComponent } from './innovative-approach.component';

describe('InnovativeApproachComponent', () => {
  let component: InnovativeApproachComponent;
  let fixture: ComponentFixture<InnovativeApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InnovativeApproachComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovativeApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
