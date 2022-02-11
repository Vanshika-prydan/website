import { AddonService } from '.';
import longString from '../../../../../mock/long-string';
import { ErrorCode } from '../../../entities/ErrorCode';

describe('AddonService', () => {
  describe('validateAndFormatName', () => {
    it('should return a valid name', () => {
      expect(AddonService.validateAndFormatName('Ett ok namn')).toBe('Ett ok namn');
    });

    it('should return a valid name which is trimed', () => {
      expect(AddonService.validateAndFormatName('   Ett ok namn   ')).toBe('Ett ok namn');
    });

    it('should throw ErrorCode.INVALID_INPUT when the name is longer than 100 chars', () => {
      expect(() => AddonService.validateAndFormatName(longString)).toThrowError(ErrorCode.INVALID_INPUT);
    });
    it('should throw ErrorCode.INVALID_INPUT when the name is less than 4 chars', () => {
      expect(() => AddonService.validateAndFormatName('123')).toThrowError(ErrorCode.INVALID_INPUT);
    });
  });

  describe('validateAndFormatDescription', () => {
    it('should return a valid description', () => {
      expect(AddonService.validateAndFormatDescription('Ett ok namn')).toBe('Ett ok namn');
    });

    it('should return a valid description which is trimed', () => {
      expect(AddonService.validateAndFormatDescription('   Ok  ')).toBe('Ok');
    });

    it('should throw INVALID_ADDON_DESCRIPTION when the description is longer than 1000 chars', () => {
      expect(() => AddonService.validateAndFormatDescription(longString)).toThrowError(ErrorCode.INVALID_INPUT);
    });
    it('should accept an empty description', () => {
      expect(AddonService.validateAndFormatDescription('')).toBe('');
    });
  });
  describe('validateDefaultTimeInMinutes', () => {
    it('should return true for a valid number', () => {
      expect(AddonService.defaultTimeInMinutesIsValid(10)).toBe(true);
    });
    it('should return true for a float number', () => {
      expect(AddonService.defaultTimeInMinutesIsValid(10.4)).toBe(false);
    });
  });
});
