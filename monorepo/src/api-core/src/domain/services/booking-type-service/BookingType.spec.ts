import BookingTypeService from '.';
import longString from '../../../../mock/long-string';
import { ErrorCode } from '../../entities/ErrorCode';

describe('BookingType entity', () => {
  describe('validateAndFormatName', () => {
    it('should return a valid name', () => {
      expect(BookingTypeService.validateAndFormatName('Ett ok namn')).toBe('Ett ok namn');
    });

    it('should return a valid name which is trimmed', () => {
      expect(BookingTypeService.validateAndFormatName('   Ett ok namn   ')).toBe('Ett ok namn');
    });

    it('should throw INVALID_BOOKING_TYPE_NAME when the name is longer than 100 chars', () => {
      expect(() => BookingTypeService.validateAndFormatName(longString)).toThrowError(ErrorCode.INVALID_INPUT);
    });
    it('should throw INVALID_BOOKING_TYPE_NAME when the name is less than 4 chars', () => {
      expect(() => BookingTypeService.validateAndFormatName('123')).toThrowError(ErrorCode.INVALID_INPUT);
    });
  });

  describe('validateAndFormatDescription', () => {
    it('should return a valid description', () => {
      expect(BookingTypeService.validateAndFormatDescription('Ett ok namn')).toBe('Ett ok namn');
    });

    it('should return a valid description which is trimmed', () => {
      expect(BookingTypeService.validateAndFormatDescription('   Ok  ')).toBe('Ok');
    });

    it('should throw INVALID_BOOKING_TYPE_DESCRIPTION when the description is longer than 1000 chars', () => {
      expect(() => BookingTypeService.validateAndFormatDescription(longString)).toThrowError(ErrorCode.INVALID_INPUT);
    });
    it('should accept an empty description but return undefined', () => {
      expect(BookingTypeService.validateAndFormatDescription('')).toBe(undefined);
    });
  });
});
