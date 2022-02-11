import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { GetAllBookingTypesUseCase } from './get-all-booking-types';

describe('get-all-booking-types use case', () => {
  it('should get a list of booking types', async () => {
    const allBookingTypes = {};
    const bookingTypeReposiotiry = {
      getAll: jest.fn(() => Promise.resolve(allBookingTypes)),
    } as unknown as IBookingTypeRepository;
    const useCase = new GetAllBookingTypesUseCase({ bookingTypeRepository: bookingTypeReposiotiry });

    await expect(useCase.execute()).resolves.toBe(allBookingTypes);
  });
});
