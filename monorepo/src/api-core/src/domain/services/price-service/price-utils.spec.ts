import { Occurrence } from '../../entities/Occurrence';
import {
  addVAT,
  getHourlyPriceInclVATWithRUT,
  calculatePriceInOreInclVATWithRUT,
  priceAfterRUTDeduction,
  getPriceInclVAT,
  getHourlyPriceInclVAT,
  calculateVAT,
  getVAT,
  calculateRUTDeduction,
  getTotalRutDeduction,
} from './price-utils';

describe('Price utils', () => {
  describe('addVAT', () => {
    it('should add 25% VAT to the price', () => {
      expect(addVAT(100)).toBe(125);
    });
  });
  describe('priceAfterRUTDeduction', () => {
    it('should reduce the price with 50%', () => {
      expect(priceAfterRUTDeduction(10000)).toBe(5000);
    });
    it('should return an int', () => {
      expect(priceAfterRUTDeduction(13)).toBe(7);
    });
  });

  describe('calculatePriceInOreInclVATWithRUT', () => {
    it('should return 25000 when the price is 400 SEK', () => {
      expect(calculatePriceInOreInclVATWithRUT(40000)).toBe(25000);
    });
  });

  describe('getHourlyPriceInclVATWithRUT', () => {
    it('Should return an price for weekly occurrence', () => {
      expect(getHourlyPriceInclVATWithRUT(Occurrence.WEEKLY)).toBe('235');
    });
    it('Should return an price for biweekly occurrence', () => {
      expect(getHourlyPriceInclVATWithRUT(Occurrence.BIWEEKLY)).toBe('245');
    });
    it('Should return an price for 4-weekly occurrence', () => {
      expect(getHourlyPriceInclVATWithRUT(Occurrence.FOURWEEKLY)).toBe('265');
    });
    it('Should return an price for oncetime occurrence', () => {
      expect(getHourlyPriceInclVATWithRUT(Occurrence.ONETIME)).toBe('300');
    });
  });
});

describe('getPriceInclVAT', () => {
  it('Should return an price for weekly occurrence', () => {
    expect(getPriceInclVAT(Occurrence.WEEKLY, 60)).toBe('470');
  });
});

describe('getHourlyPriceInclVAT', () => {
  it('', () => {
    expect(getHourlyPriceInclVAT(Occurrence.WEEKLY)).toBe('470');
  });
});

describe('calculateVAT', () => {
  it('should be 2500 on 10000', () => {
    expect(calculateVAT(10000)).toBe(2500);
  });
});

describe('getVAT', () => {
  it('should be 94 on a weekly booking', () => {
    expect(getVAT(Occurrence.WEEKLY, 60)).toBe('94');
  });
});

describe('calculateRUTDeduction', () => {
  it('should return 5000 on a price of 10000', () => {
    expect(calculateRUTDeduction(10000)).toBe(5000);
  });
});

describe('getTotalRutDeduction', () => {
  it('Should return 250 on weekly occurrence', () => {
    expect(getTotalRutDeduction(Occurrence.WEEKLY, 60)).toBe('235');
  });
});
