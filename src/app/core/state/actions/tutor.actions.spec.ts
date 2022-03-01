import * as fromTutor from './tutor.actions';

describe('loadTutors', () => {
  it('should return an action', () => {
    expect(fromTutor.loadTutors().type).toBe('[Tutor] Load Tutors');
  });
});
