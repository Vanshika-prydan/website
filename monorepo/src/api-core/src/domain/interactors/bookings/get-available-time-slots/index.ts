import { injectable, inject } from 'tsyringe';
import validator from 'validator';
import { ErrorCode } from '../../../entities/ErrorCode';
import IUseCase from '../../IUseCase';
import { OccurrenceType, Occurrence } from '../../../entities/Occurrence';

import { add, addDays, addWeeks, addMinutes, set } from 'date-fns';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { EMPLOYEE_REPOSITORY_INTERFACE, IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { EmployeeAvailabilityService } from '../../../services/employee-availability-service';
import { EmployeeDefaultAvailabilityRepositoryInterface, EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/employee-default-availability-repository';
import { IEmployee } from '../../../entities/Employee';

export interface RequestPayload {
    durationInMinutes: number;
    occurrence?: OccurrenceType;
}
export type ResponsePayload = Promise<Map<Date, IEmployee[]>>;
export interface Setup {}

@injectable()
export class GetAvailableTimeSlotsUseCase implements IUseCase<RequestPayload, ResponsePayload> {
  constructor (
    @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
    @inject(EMPLOYEE_REPOSITORY_INTERFACE) private readonly employeeRepository : IEmployeeRepository,
    @inject(EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE) private readonly employeeDefaultAvailabilityRepository: EmployeeDefaultAvailabilityRepositoryInterface,
  ) {}

   private readonly SLOT_INTERVAL_IN_HOURS = 1;
   private readonly SLOT_INTERVAL_IN_MINUTES = 0;
   private readonly NUMBER_OF_WEEKS_FROM_NOW = 8;
   private readonly TOMORROW = addDays(set(new Date(), { hours: 0, minutes: 0, milliseconds: 0, seconds: 0 }), 1);

   private generatePossibleSlots ():Date[] {
     const possibleStartTimes:Date[] = [];
     const endTime = addWeeks(new Date(this.TOMORROW), this.NUMBER_OF_WEEKS_FROM_NOW);
     let time: Date = new Date(this.TOMORROW);
     while (time < endTime) {
       possibleStartTimes.push(time);
       time = add(time, { hours: this.SLOT_INTERVAL_IN_HOURS, minutes: this.SLOT_INTERVAL_IN_MINUTES });
     }
     return possibleStartTimes;
   }

   private async checkSlotTimeAvailabilityWithEmployees (possibleStartTimes:Date[], durationInMinutes: number, occurrence: OccurrenceType = Occurrence.ONETIME):Promise<Map<Date, IEmployee[]>> {
     const map = new Map<Date, IEmployee[]>();
     const { availableEmp, allEmployeeDefaultAvailability, allBookings } = await this.fetchFromRepositories();

     possibleStartTimes.forEach((possibleStartTime) => {
       const possibleEndTime = addMinutes(possibleStartTime, durationInMinutes);
       const availableEmployees:IEmployee[] = [];

       availableEmp.forEach((employee) => {
         const empAvailability = allEmployeeDefaultAvailability.filter(e => e.employeeId === employee.employeeId);
         const employeeIsAvailable = EmployeeAvailabilityService.checkEmployeeAvailability(allBookings, employee, empAvailability, possibleStartTime, possibleEndTime, occurrence);
         if (employeeIsAvailable) availableEmployees.push(employee);
       });

       if (availableEmployees.length > 0)
         map.set(possibleStartTime, availableEmployees);
     });
     return map;
   }

   private async fetchFromRepositories () {
     const allBookings = await this.bookingRepository.getLightBookings({ from: new Date() });
     const availableEmp = await this.employeeRepository.getAll();
     const allEmployeeDefaultAvailability = await this.employeeDefaultAvailabilityRepository.fetchAll();
     return { availableEmp, allEmployeeDefaultAvailability, allBookings };
   }

   public async getAvailableTimeSlots (durationInMinutes: number, occurrence: OccurrenceType = Occurrence.ONETIME):Promise<Map<Date, IEmployee[]>> {
     const availableSlots = this.generatePossibleSlots();
     const slots = await this.checkSlotTimeAvailabilityWithEmployees(availableSlots, durationInMinutes, occurrence);
     return slots;
   }

   async execute ({ payload }: { payload: RequestPayload}): Promise<ResponsePayload> {
     const { durationInMinutes } = payload;
     const occurrence = payload.occurrence;
     if (!validator.isInt(durationInMinutes.toString()) || durationInMinutes <= 0) throw new Error(ErrorCode.INVALID_INPUT);
     return this.getAvailableTimeSlots(durationInMinutes, occurrence);
   }
}
