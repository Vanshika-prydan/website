import longString from '../../../../mock/long-string';
import { ErrorCode } from '../../entities/ErrorCode';
import BookingService from '.';

describe('Booking entity', () => {
  describe('ValidateAndFormatPrivateNotes', () => {
    it('should return undefined if the note is undefined', () => {
      expect(BookingService.ValidateAndFormatPrivateNotes(undefined)).toBe(undefined);
    });
    it('should return a correct note', () => {
      const note = 'This is \n a correct note.';
      expect(BookingService.ValidateAndFormatPrivateNotes(note)).toBe(note);
    });

    it('should return a correct formated note', () => {
      expect(BookingService.ValidateAndFormatPrivateNotes('    note. ')).toBe('note.');
    });

    it('should throw an error if the note is longer than 1000 chars', () => {
      expect(() => BookingService.ValidateAndFormatPrivateNotes(longString)).toThrowError(ErrorCode.INVALID_INPUT);
    });
  });

  describe('ValidateAndFormatSpecialInstructions', () => {
    it('should return undefined if the instructon is undefined', () => {
      expect(BookingService.ValidateAndFormatSpecialInstructions(undefined)).toBe(undefined);
    });

    it('should return a correct instructon', () => {
      const note = 'This is \n a correct instruction.';
      expect(BookingService.ValidateAndFormatSpecialInstructions(note)).toBe(note);
    });

    it('should return a correct formated instruction', () => {
      expect(BookingService.ValidateAndFormatSpecialInstructions('    note. ')).toBe('note.');
    });

    it('should throw an error if the note is longer than 1000 chars', () => {
      expect(() => BookingService.ValidateAndFormatSpecialInstructions(longString)).toThrowError(ErrorCode.INVALID_INPUT);
    });
  });
});
