import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TutorEffects } from './tutor.effects';

describe('TutorEffects', () => {
  let actions$: Observable<any>;
  let effects: TutorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TutorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TutorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
