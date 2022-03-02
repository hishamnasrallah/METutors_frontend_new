import * as fromTutor from './tutor.actions';

describe('loadTutor', () => {
  it('should return an action', () => {
    expect(fromTutor.loadTutor({ id: 1 }).type).toBe('[Tutor] Load Tutor');
  });
});
