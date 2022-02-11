import validator from 'validator';
import { ErrorCode } from '../../../entities/ErrorCode';

export class AddonService {
  public static validateAndFormatName (name: string): string {
    const formatted = name.trim();
    if (!validator.isLength(formatted, { max: 100, min: 4 })) throw new Error(ErrorCode.INVALID_INPUT);
    return formatted;
  }

  public static validateAndFormatDescription (description: string): string {
    const formatted = description.trim();
    if (!validator.isLength(formatted, { max: 1000 })) throw new Error(ErrorCode.INVALID_INPUT);
    return formatted;
  }

  public static validateAndReturnDefaultTimeInMinutes (minutes: number): number {
    if (!AddonService.defaultTimeInMinutesIsValid(minutes)) throw new Error(ErrorCode.INVALID_INPUT);
    return minutes;
  }

  public static defaultTimeInMinutesIsValid (minutes: number): boolean {
    const isInt = validator.isInt(minutes.toString());
    const isGreaterThanZero = minutes > 0;
    return isInt && isGreaterThanZero;
  }
}
