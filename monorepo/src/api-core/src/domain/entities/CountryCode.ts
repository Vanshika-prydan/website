export const COUNTRY_CODE = {
  SE: 'SE',
} as const;

export type CountryCode = typeof COUNTRY_CODE[ keyof typeof COUNTRY_CODE];
