import { openConnection, closeConnection } from '../../database/test-setup';
import { IAddPayload } from '../../domain/interface-adapters/repositories/booking-type-repository/add-payload';
import { BookingTypeRepository } from './booking-type-repository';

describe('BookingTypeRepository', () => {
  beforeEach(async () => {
    await openConnection();
  });
  afterEach(async () => {
    await closeConnection();
  });
  it('should be possible to create a new Booking Type', async () => {
    const repo = new BookingTypeRepository();
    const payload: IAddPayload = {
      name: 'Deep cleaning 2.5h',
      description: 'A deep clening of the appartment',
    };
    const reslut = await repo.add(payload);
    expect(reslut.bookingTypeId).toBeDefined();
  });
  it('Should return a list with all booking types', async () => {
    const repo = new BookingTypeRepository();
    const payload: IAddPayload = {
      name: 'Deep cleaning 2.5h',
      description: 'A deep clening of the appartment',
    };
    await repo.add(payload);

    const expectedResult = [{
      bookingTypeId: expect.any(String),
      name: 'Deep cleaning 2.5h',
      description: 'A deep clening of the appartment',
    }];
    await expect(repo.getAll()).resolves.toEqual(expect.arrayContaining(expectedResult));
  });
});
