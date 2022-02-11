import PostalCode from '.';

describe('Postal code', () => {
  describe('getCityFromCode', () => {
    it('should return Stockholm from 11443', () => {
      expect(new PostalCode().getCityFromCode('11443')).toBe('Stockholm');
    });
    it('should return Bromma from 16104', () => {
      expect(new PostalCode().getCityFromCode('16104')).toBe('Bromma');
    });
    it('should throw an error if the code does not exists', () => {
      expect(() => new PostalCode().getCityFromCode('fffff')).toThrowError(
        'INVALID_INPUT'
      );
    });
  });
  describe('Validate postal code', () => {
    it('should return true for a valid postal cod', () => {
      expect(new PostalCode().validatePostalCode('11443')).toBe(true);
    });
    it('should return false for an ivalid postal cod', () => {
      expect(new PostalCode().validatePostalCode('gtdtdt')).toBe(false);
    });
  });
});
