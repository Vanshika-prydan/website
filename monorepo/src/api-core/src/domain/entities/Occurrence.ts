// export type OccurrenceType = 'WEEKLY' | 'BIWEEKLY' | 'FOURWEEKLY' | 'ONETIME';

export const Occurrence = {
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  FOURWEEKLY: 'fourweekly',
  ONETIME: 'onetime',

} as const;

export type OccurrenceType = typeof Occurrence[keyof typeof Occurrence];
