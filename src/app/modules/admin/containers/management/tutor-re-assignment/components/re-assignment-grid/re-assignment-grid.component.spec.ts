import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAssignmentGridComponent } from './re-assignment-grid.component';

describe('ReAssignmentGridComponent', () => {
  let component: ReAssignmentGridComponent;
  let fixture: ComponentFixture<ReAssignmentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReAssignmentGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAssignmentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
