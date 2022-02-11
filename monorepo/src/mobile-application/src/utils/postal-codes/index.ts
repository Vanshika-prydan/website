import { availablePostalCities } from './available-postal-cities';

export default class PostalCode {
  private readonly availablePostalCities = availablePostalCities;

  public getCityFromCode (code: string): string {
    let city = '';
    this.availablePostalCities.forEach((c) => {
      if (c.codes.includes(code)) city = c.city;
    });
    if (city) {
      return city;
    } else throw new Error('INVALID_INPUT');
  }

  public validatePostalCode (code: string): boolean {
    let exists = false;
    this.availablePostalCities.forEach((p) => {
      if (p.codes.includes(code)) exists = true;
    });
    return exists;
  }
}
