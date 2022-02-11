import { addMinutes } from 'date-fns';
import { injectable } from 'tsyringe';
import { BookingAddon } from '../../../entities/BookingAddon/BookingAddon.db';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAccount } from '../../../entities/Account';
import { IBooking } from '../../../entities/Booking';
import { IBookingAddon } from '../../../entities/BookingAddon';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { AccountService } from '../../../services/account-service';
import { EmployeeAvailabilityService } from '../../../services/employee-availability-service';
import { checkAvailability } from '../../../services/booking-utils';
import { EditableFields, UpdateBookingPayload, UpdateBookingSetup } from './types';
import BookingService from '../../../services/booking-service';

@injectable()
export class UpdateBookingUseCase implements IUseCase<UpdateBookingPayload, IBooking> {
   private readonly bookingRepository: IBookingRepository;
   private readonly accountRepository: IAccountRepository;
   private readonly employeeAvailabilityService: EmployeeAvailabilityService;
   private readonly bookingTypeRepository: IBookingTypeRepository;
   private readonly employeeRepository: IEmployeeRepository;
   private readonly addonRepository: IAddonRepository;

   constructor (setup:UpdateBookingSetup) {
     this.bookingRepository = setup.bookingRepository;
     this.bookingTypeRepository = setup.bookingTypeRepository;
     this.accountRepository = setup.accountRepository;
     this.employeeAvailabilityService = setup.employeeAvailabilityService;
     this.employeeRepository = setup.employeeRepository;
     this.addonRepository = setup.addonRepository;
   }

   async execute ({ payload, idOfExecutingAccount }: { payload: UpdateBookingPayload ; idOfExecutingAccount: string }): Promise<IBooking> {
     const { bookingId, fieldsToUpdate } = payload;

     const booking = await this.loadBookingOrFail(bookingId);
     const account = await this.loadAccountOrFail(idOfExecutingAccount);

     if (idOfExecutingAccount !== booking.customer.account.accountId)
       AccountService.checkPermissionOrFail(account, Permission.BOOKING_UPDATE_CUSTOMER_BOOKING);

     this.updateAddress(fieldsToUpdate, booking);
     await this.updateBookingType(fieldsToUpdate, booking);
     await this.updateEmployee(fieldsToUpdate, account, booking);
     this.updatePrivateNotes(fieldsToUpdate, booking);
     this.updateSpecialInstructions(fieldsToUpdate, booking);

     await this.updateAddons(payload, booking);

     await this.bookingRepository.save(booking);
     return booking;
   }

   private async updateAddons (payload: UpdateBookingPayload, booking: IBooking) {
     if (payload.fieldsToUpdate.addonIds) {
       const minutesOfOldAddons = booking.addons?.map(a => a.addon.defaultTimeInMinutes * a.numberOfUnits).reduce((acc, current) => acc + current, 0) ?? 0;
       booking.endTime = addMinutes(booking.endTime, -minutesOfOldAddons);

       if (payload.fieldsToUpdate.addonIds.length === 0) {
         booking.addons = [];
         return;
       }
       const addons = await this.addonRepository.findByIds(payload.fieldsToUpdate.addonIds);
       if (addons.length === 0)
         throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
       const bookingAddons: IBookingAddon[] = addons.map(addon => new BookingAddon({ addon, numberOfUnits: 1 }));
       const minutesOfAllAddons: number = addons.map(a => a.defaultTimeInMinutes).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

       const endTime = addMinutes(booking.endTime, minutesOfAllAddons);

       const employeeBookings = await this.bookingRepository.getByEmployeeId(booking.employee.employeeId);
       const employeeIsAvailable = checkAvailability(
         employeeBookings.filter(b => b.bookingId !== booking.bookingId),
         booking.startTime,
         endTime,
       );
       if (!employeeIsAvailable)
         throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
       booking.addons = bookingAddons;
       booking.endTime = endTime;
     }
   }

   private updateSpecialInstructions (fieldsToUpdate: Partial<EditableFields>, booking: IBooking) {
     if (fieldsToUpdate.specialInstructions)
       booking.specialInstructions = BookingService.ValidateAndFormatSpecialInstructions(fieldsToUpdate.specialInstructions);
   }

   private updatePrivateNotes (fieldsToUpdate: Partial<EditableFields>, booking: IBooking) {
     if (fieldsToUpdate.privateNotes)
       booking.privateNotes = BookingService.ValidateAndFormatPrivateNotes(fieldsToUpdate.privateNotes);
   }

   private async updateEmployee (fieldsToUpdate: Partial<EditableFields>, account: IAccount, booking: IBooking) {
     if (fieldsToUpdate.employeeId) {
       if (!AccountService.accountHasPermission(account, Permission.BOOKING_UPDATE_CUSTOMER_BOOKING))
         throw new Error(ErrorCode.ACCESS_DENIED);
       const employee = await this.employeeRepository.findByEmployeeId(fieldsToUpdate.employeeId);
       if (!employee)
         throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
       booking.employee = employee;
       if (!await this.employeeAvailabilityService.loadAndCheckAvailability({ employee, startTime: booking.startTime, endTime: booking.endTime }))
         throw new Error(ErrorCode.TIME_SLOT_IS_NOT_AVAILABLE);
     }
   }

   private async updateBookingType (fieldsToUpdate: Partial<EditableFields>, booking: IBooking) {
     if (fieldsToUpdate.bookingTypeId) {
       const bookingType = await this.bookingTypeRepository.get(fieldsToUpdate.bookingTypeId);
       if (!bookingType)
         throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
       booking.bookingType = bookingType;
     }
   }

   private updateAddress (fieldsToUpdate: Partial<EditableFields>, booking: IBooking) {
     if (fieldsToUpdate.addressId) {
       const addressesOfCustomer = booking.customer.addresses?.map(a => a.address);
       const address = addressesOfCustomer?.find(a => a.addressId === fieldsToUpdate.addressId);
       if (!address)
         throw new Error(ErrorCode.ACCESS_DENIED);
       booking.address = address;
     }
   }

   private async loadBookingOrFail (bookingId: string) {
     const booking = await this.bookingRepository.getById(bookingId);
     if (!booking)
       throw new Error(ErrorCode.ID_DOES_NOT_EXIST);
     return booking;
   }

   private async loadAccountOrFail (idOfExecutingAccount: string) {
     const account = await this.accountRepository.findById(idOfExecutingAccount);
     if (!account)
       throw new Error(ErrorCode.ACCOUNT_DOES_NOT_EXIST);
     return account;
   }
}
