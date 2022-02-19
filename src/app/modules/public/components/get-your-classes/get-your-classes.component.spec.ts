import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetYourClassesComponent } from './get-your-classes.component';

describe('GetYourClassesComponent', () => {
  let component: GetYourClassesComponent;
  let fixture: ComponentFixture<GetYourClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetYourClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetYourClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
