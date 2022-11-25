import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CometChatComponent } from './comet-chat.component';

describe('CometChatComponent', () => {
  let component: CometChatComponent;
  let fixture: ComponentFixture<CometChatComponent>;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CometChatComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
