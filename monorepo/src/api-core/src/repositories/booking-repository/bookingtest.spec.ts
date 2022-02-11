
import { createConnection } from 'typeorm';
import { BookingRepository } from './booking-repository';

describe('Booking test', () => {
  beforeAll(async () => {
    await createConnection();
  });
  it('Should run', async () => {
    const repo = new BookingRepository();

    await repo.getAll();
  });
});
