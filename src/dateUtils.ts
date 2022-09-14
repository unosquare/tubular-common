import dayjs = require('dayjs');
import customParseFormat = require('dayjs/plugin/customParseFormat');
import isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
import isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
import isBetween = require('dayjs/plugin/isBetween');
import { ColumnModel } from './Models';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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

export const dateIsBetween = (column: ColumnModel, from: string, to: string, value: string): boolean => {
    dayjs.extend(isBetween);

    return dayjs(dayjs(value, column.dateOriginFormat)).isBetween(
        dayjs(from, column.dateOriginFormat),
        dayjs(to, column.dateOriginFormat),
        null,
        '[]',
    );
};

export default dayjs;
