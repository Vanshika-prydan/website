import { addMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { BookingFullyDefined } from '../../../entities/Booking';
import BookingAddon, { IBookingAddon } from '../../../entities/BookingAddon';
import { ADDON_REPOSITORY_INTERFACE, IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { checkAvailability } from '../../../services/booking-utils';
import BookingService from '../../../services/booking-service';

export interface RequestPayload {
    bookingId: string;
    addonIds: string[];
}

@injectable()
export default class AddAddonToBookingUseCase implements IUseCase<RequestPayload, BookingFullyDefined> {
  constructor (
        @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
        @inject(ADDON_REPOSITORY_INTERFACE) private readonly addonRepository: IAddonRepository,
        private readonly bookingService: BookingService,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: RequestPayload; idOfExecutingAccount: string ; }): Promise<BookingFullyDefined> {
    const booking = await this.bookingService.fetchByIdOrFail(payload.bookingId);
    this.authorizeExecutingAccountOrFail(booking, idOfExecutingAccount);
    const addons = await this.fetchAddonsOrFail(payload);
    const bookingAddons:IBookingAddon[] = addons.map(addon => new BookingAddon({ addon, numberOfUnits: 1 }));
    const minutesToAdd :number = addons.map(a => a.defaultTimeInMinutes).reduce((accumulator, currentValue) => accumulator + currentValue);
    const updatedBooking:BookingFullyDefined = {
      ...booking,
      addons: [...booking.addons ?? [], ...bookingAddons],
      endTime: addMinutes(booking.endTime, minutesToAdd),
    };

    await this.ensureEmployeeAvailabilityOrFail(booking, updatedBooking);
    await this.bookingRepository.save(updatedBooking);
    return updatedBooking;
  }

  private authorizeExecutingAccountOrFail (booking: BookingFullyDefined, idOfExecutingAccount: string) {
    if (booking.customer.account.accountId !== idOfExecutingAccount)
      throw new Error(ErrorCode.ACCESS_DENIED);
  }

  private async fetchAddonsOrFail (payload: RequestPayload) {
    const addons = await this.addonRepository.findByIds(payload.addonIds);
    if (addons.length === 0)
      throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
    return addons;
  }

  private async ensureEmployeeAvailabilityOrFail (booking: BookingFullyDefined, updatedBooking: BookingFullyDefined) {
    const employeeBookings = await this.bookingRepository.getByEmployeeId(booking.employee.employeeId);
    const employeeIsAvailable = checkAvailability(
      employeeBookings.filter(b => b.bookingId !== booking.bookingId),
      updatedBooking.startTime,
      updatedBooking.endTime,
    );

    if (!employeeIsAvailable) throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
  }
}
