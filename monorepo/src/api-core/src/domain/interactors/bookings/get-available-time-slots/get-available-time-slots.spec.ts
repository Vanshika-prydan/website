import { GetAvailableTimeSlotsUseCase } from '.';

import { mockEmployee } from '../../../../../mock/employee';
import { MockBookingLight } from '../../../entities/BookingLight';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import { EmployeeDefaultAvailabilityRepositoryInterface } from '../../../interface-adapters/repositories/employee-default-availability-repository';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';

describe('get-available-time-slots use case', () => {
  // @ts-ignore
  const bookingRepository:IBookingRepository = { getAll: jest.fn(() => Promise.resolve([])), getLightBookings: jest.fn(() => Promise.resolve([new MockBookingLight()])) };
  const employeeRepository: IEmployeeRepository = { getAll: jest.fn(() => Promise.resolve([mockEmployee])) } as unknown as IEmployeeRepository;
  // @ts-ignore
  const empAvailRepo: EmployeeDefaultAvailabilityRepositoryInterface = { fetchAll: jest.fn(() => Promise.resolve([])) };
  it('Should return a list', async () => {
    const useCase = new GetAvailableTimeSlotsUseCase(bookingRepository, employeeRepository, empAvailRepo);

    await useCase.execute({ payload: { durationInMinutes: 5 } });
  });

  it('Should generate time slots', async () => {
    // @ts-ignore
    const bookingRepository:IBookingRepository = { getAll: jest.fn(() => Promise.resolve([])), getLightBookings: jest.fn(() => Promise.resolve([new MockBookingLight()])) };
    const employeeRepository: IEmployeeRepository = { getAll: jest.fn(() => Promise.resolve([mockEmployee])) } as unknown as IEmployeeRepository;
    // @ts-ignore
    const service = new GetAvailableTimeSlotsUseCase(bookingRepository, employeeRepository, empAvailRepo);
    await service.getAvailableTimeSlots(100);
  });
});
