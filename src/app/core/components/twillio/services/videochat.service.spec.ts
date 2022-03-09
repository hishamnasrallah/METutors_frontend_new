import { TestBed } from '@angular/core/testing';

import { VideoChatService } from './videochat.service';

describe('VideochatService', () => {
  let service: VideoChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
