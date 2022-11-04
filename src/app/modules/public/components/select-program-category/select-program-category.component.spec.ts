import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProgramCategoryComponent } from './select-program-category.component';

describe('SelectProgramCategoryComponent', () => {
  let component: SelectProgramCategoryComponent;
  let fixture: ComponentFixture<SelectProgramCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectProgramCategoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProgramCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
