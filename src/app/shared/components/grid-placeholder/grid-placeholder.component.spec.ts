import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPlaceholderComponent } from '@metutor/shared/components';

describe('GridPlaceholderComponent', () => {
  let component: GridPlaceholderComponent;
  let fixture: ComponentFixture<GridPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridPlaceholderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
