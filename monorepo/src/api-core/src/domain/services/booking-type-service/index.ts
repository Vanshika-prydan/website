import validator from 'validator';
import { ErrorCode } from '../../entities/ErrorCode';

export default class BookingTypeService {
  public static validateAndFormatName (name: string): string {
    const formatted = name.trim();
    if (!validator.isLength(formatted, { max: 100, min: 4 })) throw new Error(ErrorCode.INVALID_INPUT);
    return formatted;
  }

  public static validateAndFormatDescription (description: string | undefined | null): string | undefined {
    if (!description) return undefined;
    const formatted = description.trim();
    if (!validator.isLength(formatted, { max: 1000 })) throw new Error(ErrorCode.INVALID_INPUT);
    return formatted;
  }
}
