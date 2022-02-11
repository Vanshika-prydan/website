import { ErrorCode } from '../../../entities/ErrorCode';
import { IBookingType } from '../../../entities/BookingType';
import Permission from '../../../entities/Permission';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { CreateBookingTypeUseCase } from './create-booking-type';
import { ICreateBookingTypeRequestPayload } from './types';

describe('Create booking type use case', () => {
  const payload: ICreateBookingTypeRequestPayload = {
    name: 'Deep cleaning',
    description: 'Desc',
  };
  it('should be possible to create a new type with correct input and get it in return', async () => {
    const returnValue = {} as unknown as IBookingType;
    const bookingTypeRepository = { add: jest.fn(() => Promise.resolve(returnValue)) } as unknown as IBookingTypeRepository;
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_CREATE_BOOKING_TYPE);

    const useCase = new CreateBookingTypeUseCase({ bookingTypeRepository, accountRepository });

    await expect(useCase.execute({ payload, idOfExecutingAccount: 'accountid' })).resolves.toBe(returnValue);
    expect(bookingTypeRepository.add).toHaveBeenCalledWith(payload);
  });
  it('should throw is the access Permission.BOOKING_CREATE_TYPE is missing ', async () => {
    const bookingTypeRepository = { } as unknown as IBookingTypeRepository;
    const accountRepository = generateAccountRepositoryForAuthorization();

    const useCase = new CreateBookingTypeUseCase({ bookingTypeRepository, accountRepository });
    await expect(useCase.execute({ payload, idOfExecutingAccount: 'uuid' })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
  it('should throw an error if the input is incorrect', async () => {
    const bookingTypeRepository = { } as unknown as IBookingTypeRepository;
    const accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_CREATE_BOOKING_TYPE);
    const useCase = new CreateBookingTypeUseCase({ bookingTypeRepository, accountRepository });
  });
});
