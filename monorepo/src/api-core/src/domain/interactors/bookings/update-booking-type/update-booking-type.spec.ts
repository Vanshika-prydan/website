import { mockAccount } from '../../../../../mock/account';
import { mockBookingType } from '../../../../../mock/booking-type';
import { ErrorCode } from '../../../entities/ErrorCode';
import Permission from '../../../entities/Permission';
import { IBookingTypeRepository } from '../../../interface-adapters/repositories/booking-type-repository';
import { generateAccountRepositoryForAuthorization } from '../../../services/test-utils';
import { UpdateBookingTypeRequestPayload } from './types';
import { UpdateBookingTypeUseCase } from './update-booking-type';

describe('Update booking type repository', () => {
  const idOfExecutingAccount = mockAccount.accountId;
  const bookingTypeRepository = { update: jest.fn(() => Promise.resolve(mockBookingType)), get: jest.fn(() => Promise.resolve(mockBookingType)) } as unknown as IBookingTypeRepository;
  let accountRepository = generateAccountRepositoryForAuthorization(Permission.BOOKING_UPDATE_BOOKING_TYPE);
  it('should be possible to update the booking type', async () => {
    const usecase = new UpdateBookingTypeUseCase({ bookingTypeRepository, accountRepository });
    const payload: UpdateBookingTypeRequestPayload = { bookingTypeId: mockBookingType.bookingTypeId, fieldsToUpdate: { name: 'Nytt namn' } };
    await expect(usecase.execute({ payload, idOfExecutingAccount })).resolves.toBe(mockBookingType);
    expect(bookingTypeRepository.update).toHaveBeenCalledWith({ ...mockBookingType, name: 'Nytt namn' });
  });
  it('should throw an error if it missing the correct access', async () => {
    accountRepository = generateAccountRepositoryForAuthorization();
    const usecase = new UpdateBookingTypeUseCase({ bookingTypeRepository, accountRepository });
    const payload: UpdateBookingTypeRequestPayload = { bookingTypeId: mockBookingType.bookingTypeId, fieldsToUpdate: { name: 'nytt namn' } };
    await expect(usecase.execute({ payload, idOfExecutingAccount })).rejects.toThrowError(ErrorCode.ACCESS_DENIED);
  });
});
