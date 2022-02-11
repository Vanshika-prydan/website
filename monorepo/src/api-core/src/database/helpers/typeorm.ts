import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';
import { format } from 'date-fns';

export const MoreThanDate = (date: Date) => MoreThan(format(date, 'yyyy-MM-dd HH:mm:ss'));
export const LessThanDate = (date: Date) => LessThan(format(date, 'yyyy-MM-dd HH:mm:ss'));
export const MoreThanOrEqualDate = (date: Date) => MoreThanOrEqual(format(date, 'yyyy-MM-dd HH:mm:ss'));
export const LessThanOrEqualDate = (date: Date) => LessThanOrEqual(format(date, 'yyyy-MM-dd HH:mm:ss'));
