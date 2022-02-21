import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSendMessageComponent } from './contact-send-message.component';

describe('ContactSendMessageComponent', () => {
  let component: ContactSendMessageComponent;
  let fixture: ComponentFixture<ContactSendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactSendMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
