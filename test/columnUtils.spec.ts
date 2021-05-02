import {
    getOperators,
    ColumnDataType,
    columnHasFilter,
    NumericOperators,
    StringOperators,
    BooleanOperators,
    CompareOperators,
    sortColumnArray,
    parseDateColumnValue,
    ColumnModel,
} from '../src/Models';
import { simpleRequestWithFilters1, mockColumnModel } from './mock';

describe('getOperators', () => {
    it('Should return StringOperators', () =>
        expect(getOperators({ ...mockColumnModel, dataType: ColumnDataType.String })).toEqual(StringOperators));

    it('Should return NumericOperators', () =>
        expect(getOperators({ ...mockColumnModel, dataType: ColumnDataType.Numeric })).toEqual(NumericOperators));

    it('Should return BooleanOperators', () =>
        expect(getOperators({ ...mockColumnModel, dataType: ColumnDataType.Boolean })).toEqual(BooleanOperators));

    it('Should return an empty array', () => expect(getOperators({ ...mockColumnModel, dataType: null })).toEqual([]));
});

describe('sortColumnArray', () => {
    it('Should returnundefined', () => {
        expect(sortColumnArray('OrderID', [], false)).toBeUndefined();
    });

    it('Should return columns ordered', () => {
        expect(sortColumnArray('OrderID', simpleRequestWithFilters1.columns, false)).not.toBeNull();
    });
});

describe('columnHasFilter', () => {
    it('Should return True if column has a filter', () =>
        expect(columnHasFilter({ ...mockColumnModel, filterOperator: CompareOperators.Equals })).toBeTruthy());
});

describe('parseDateColumnValue', () => {
    it('Should parse "2020-01-14" as "01 14 - 2020"', () => {
        const dateColumn: ColumnModel = {
            ...mockColumnModel,
            dataType: ColumnDataType.Date,
            dateDisplayFormat: 'MM DD - YYYY',
        };
        expect(parseDateColumnValue(dateColumn, '2020-01-14')).toBe('01 14 - 2020');
    });

    it('Should parse "2020-01-14T23:00:00" as "Month: 01 Year: 2020 Day: 14, 11:00:00 PM"', () => {
        const dateColumn: ColumnModel = {
            ...mockColumnModel,
            dataType: ColumnDataType.DateTime,
            dateTimeDisplayFormat: '[Month:] MM [Year:] YYYY [Day:] DD, hh:mm:ss A',
        };
        expect(parseDateColumnValue(dateColumn, '2020-01-14T23:00:00')).toBe(
            'Month: 01 Year: 2020 Day: 14, 11:00:00 PM',
        );
    });
});
