import { Occurrence, OccurrenceType } from '../services/api-service/types';

const SWEDISH_VAT_IN_PERCENT = 25;
const RUT_DEDUCTION_IN_PERCENT = 50;

export const PricePerHourInOreExclVATExclRUT = {
  [Occurrence.WEEKLY]: 32000, // 37600,
  [Occurrence.BIWEEKLY]: 32000, // 39200,
  [Occurrence.FOURWEEKLY]: 32000, // 42400,
  [Occurrence.ONETIME]: 32000, // 48000,
} as const;

export const calculatePrice = (
  occurrene: OccurrenceType,
  durationInMinutes: number
): number => {
  return (PricePerHourInOreExclVATExclRUT[occurrene] * durationInMinutes) / 60;
};

export const addVAT = (priceInOre: number): number => {
  return (1 + SWEDISH_VAT_IN_PERCENT / 100) * priceInOre;
};

export const priceAfterRUTDeduction = (price: number): number => {
  return Math.ceil((RUT_DEDUCTION_IN_PERCENT / 100) * price);
};

export const calculateRUTDeduction = (price: number): number => {
  return (price * RUT_DEDUCTION_IN_PERCENT) / 100;
};

export const getTotalRutDeduction = (
  occurrence: OccurrenceType,
  durationInMinutes: number
): string => {
  return convertOreToSek(
    calculateRUTDeduction(calculatePriceInclVAT(occurrence, durationInMinutes))
  ).toString();
};

export const calculatePriceInclVAT = (
  occurrence: OccurrenceType,
  durationInMinutes: number
): number => {
  return addVAT(calculatePrice(occurrence, durationInMinutes));
};

export const calculatePriceInOreInclVATWithRUT = (
  priceInOre: number
): number => {
  return priceAfterRUTDeduction(addVAT(priceInOre));
};

export const convertOreToSek = (price: number): number => {
  return price / 100;
};

export const getHourlyPriceInclVATWithRUT = (
  occurrence: OccurrenceType
): string => {
  return getPriceInclVATWithRUT(occurrence, 60);
};

export const getPriceInclVATWithRUT = (
  occurrence: OccurrenceType,
  numberOfMinutes: number
): string => {
  return convertOreToSek(
    calculatePriceInOreInclVATWithRUT(
      (PricePerHourInOreExclVATExclRUT[occurrence] * numberOfMinutes) / 60
    )
  ).toString();
};

export const getPriceInclVAT = (
  occurrence: OccurrenceType,
  numberOfMinutes: number
): string => {
  return convertOreToSek(
    addVAT((PricePerHourInOreExclVATExclRUT[occurrence] * numberOfMinutes) / 60)
  ).toString();
};

export const getHourlyPriceInclVAT = (occurrence: OccurrenceType): string => {
  return getPriceInclVAT(occurrence, 60);
};

export const calculateVAT = (priceExclVAT: number): number => {
  return (SWEDISH_VAT_IN_PERCENT * priceExclVAT) / 100;
};

export const getVAT = (
  occurrence: OccurrenceType,
  durationInMinutes: number
): string => {
  return (
    calculateVAT(calculatePrice(occurrence, durationInMinutes)) / 100
  ).toString();
};
