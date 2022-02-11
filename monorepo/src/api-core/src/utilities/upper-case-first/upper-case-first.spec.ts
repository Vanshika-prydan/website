import { upperCaseFirst } from '.';

describe('Capital first letter', () => {
  it('Should return the string with a capital first letter', () => {
    expect(upperCaseFirst('hej')).toBe('Hej');
    expect(upperCaseFirst(' hej')).toBe(' hej');
    expect(upperCaseFirst('HEJ')).toBe('HEJ');
  });
})
;
