import * as fromTutor from './tutor.actions';

describe('loadTutor', () => {
  it('should return an action', () => {
    expect(fromTutor.loadTutor().type).toBe('[Tutor] Load Tutor');
  });
});
