import SetDefaultEmployeeAvailability, { RequestPayload } from './index1';
import { EmployeeDefaultAvailability } from '../../../entities/EmployeeDefaultAvailability';
import MockEmployee from '../../../entities/Employee/MockEmployee';
import { EmployeeDefaultAvailabilityRepositoryInterface } from '../../../interface-adapters/repositories/employee-default-availability-repository';
import { IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import EmployeeDefaultAvailabilityService from '../../../services/employee-default-availability-service';

describe('Set availability use case', () => {
  // @ts-ignore
  const repo: EmployeeDefaultAvailabilityRepositoryInterface = { save: jest.fn(() => Promise.resolve()) };
  // @ts-ignore
  const bookingRepository: IBookingRepository = { getByEmployeeId: jest.fn(() => Promise.resolve([])) };

  // @ts-ignore
  const employeeDefaultAvailabilityService: EmployeeDefaultAvailabilityService = { hasCollisionsWithExistingBookings: jest.fn(() => Promise.resolve(true)) };

  it('should return a list of two entities', async () => {
    const payload:RequestPayload = {
      employee: new MockEmployee(),
      availability: [
        { day: 'MONDAY', startHour: 10, endHour: 17 },
        { day: 'TUESDAY', startHour: 10, endHour: 17 },
      ],

    };
    const usecase = new SetDefaultEmployeeAvailability(repo, employeeDefaultAvailabilityService);
    const result = await usecase.execute(payload);
    expect(result).toEqual(expect.arrayContaining([expect.any(EmployeeDefaultAvailability)]));
    expect(result.length).toBe(2);
  });

  it('should throw if a value is incorrectly set', async () => {
    // @ts-ignore
    const payload:RequestPayload = {
      employee: new MockEmployee(),
      availability: [{ day: 'TUESDAY', startHour: -2, endHour: 17 }],

    };
    const usecase = new SetDefaultEmployeeAvailability(repo, employeeDefaultAvailabilityService);
    await expect(usecase.execute(payload)).rejects.toThrow();
  });
});
