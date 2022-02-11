import { injectable } from 'tsyringe';
import { ErrorCode } from '../../entities/ErrorCode';

@injectable()
export default class CustomerAddressService {
  public static validateAndFormatNumberOfBathrooms (val: unknown): number|undefined {
    if (val === undefined) return;
    if (Number.isNaN((val as number))) throw new Error(ErrorCode.INVALID_INPUT);
    const confirmedNumber = val as number;
    if (confirmedNumber < 0 || !Number.isInteger(val) || confirmedNumber > 20) throw new Error(ErrorCode.INVALID_INPUT);
    return confirmedNumber;
  }

  public static validateAndFormatHomeAreaInM2 (val: unknown): number|undefined {
    if (val === undefined) return;
    if (Number.isNaN((val as number))) throw new Error(ErrorCode.INVALID_INPUT);
    const confirmedNumber = val as number;
    if (confirmedNumber <= 0 || !Number.isInteger(val)) throw new Error(ErrorCode.INVALID_INPUT);
    return confirmedNumber;
  }
}
