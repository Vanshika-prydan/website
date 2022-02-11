import { addMinutes } from 'date-fns';
import PriceService from '.';
import { mockBooking } from '../../../../mock/booking';

describe('Price service', () => {
  it('calculateChargeableAmount should return 300 00 for one hour one time', async () => {
    const startTime = new Date();
    const endTime = addMinutes(startTime, 60);
    const booking = { ...mockBooking, startTime, endTime };

    const priceService = new PriceService();
    await expect(priceService.calculateChargeableAmount(booking)).resolves.toBe(30000);
  });
});
