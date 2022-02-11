import { inject, injectable } from 'tsyringe';
import { FrameBookingFullyDefined } from '../../../entities/FrameBooking/IFrameBooking';
import Permission from '../../../entities/Permission';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import AccountService from '../../../services/account-service';
import IUseCase from '../../IUseCase';
import IFrameBookingRepository, { FRAME_BOOKING_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/frame-booking-repository';
import { ErrorCode } from '../../../entities/ErrorCode';
import BookingServiceFacade from '../../../services/booking';

export interface EditFrameBookingRequestPayload {
  frameBookingId: string;
  employeeId: string;
}

@injectable()
export default class EditFrameBookingUseCase implements IUseCase<EditFrameBookingRequestPayload, FrameBookingFullyDefined> {
  constructor (
   @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
   @inject(FRAME_BOOKING_REPOSITORY_INTERFACE) private readonly frameBookingRepository: IFrameBookingRepository,
   private readonly bookingService: BookingServiceFacade,
  ) {}

  public async execute ({ payload, idOfExecutingAccount }: { payload: EditFrameBookingRequestPayload ; idOfExecutingAccount: string }): Promise<FrameBookingFullyDefined> {
    await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.BOOKING_UPDATE_CUSTOMER_BOOKING);
    await this.bookingService.updateEmployeeToFrameBooking(payload.frameBookingId, payload.employeeId);
    const fb = await this.frameBookingRepository.findById(payload.frameBookingId);
    if (!fb) throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
    return fb;
  }
}
