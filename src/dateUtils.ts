import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import type { ColumnModel } from './Models';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export const areDatesEqual = (column: ColumnModel, date1: string, date2: string): boolean =>
    dayjs(date1, column.dateOriginFormat).isSame(dayjs(date2, column.dateOriginFormat), 'd');

export const isDateAfter = (column: ColumnModel, date1: string, date2: string, inclusive = false): boolean => {
    if (inclusive) {
        return dayjs(date1, column.dateOriginFormat).isSameOrAfter(dayjs(date2, column.dateOriginFormat), 'd');
    }

    return dayjs(date1, column.dateOriginFormat).isAfter(dayjs(date2, column.dateOriginFormat), 'd');
};

export const isDateBefore = (column: ColumnModel, date1: string, date2: string, inclusive = false): boolean => {
    if (inclusive) {
        return dayjs(date1, column.dateOriginFormat).isSameOrBefore(dayjs(date2, column.dateOriginFormat), 'd');
    }

    return dayjs(date1, column.dateOriginFormat).isBefore(dayjs(date2, column.dateOriginFormat), 'd');
};

export const dateIsBetween = (column: ColumnModel, from: string, to: string, value: string): boolean =>
    dayjs(dayjs(value, column.dateOriginFormat)).isBetween(
        dayjs(from, column.dateOriginFormat),
        dayjs(to, column.dateOriginFormat),
        null,
        '[]',
    );

export default dayjs;
