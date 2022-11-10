import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkProjectHelpComponent } from './homework-project-help.component';

describe('HomeworkProjectHelpComponent', () => {
  let component: HomeworkProjectHelpComponent;
  let fixture: ComponentFixture<HomeworkProjectHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeworkProjectHelpComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkProjectHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
