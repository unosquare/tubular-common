import { ColumnDataType, CompareOperators } from '../../src';
import { createRequestWithDatesFilter } from '../mock';

export const filterDateCases = [
    {
        name: 'Date filtering with DateTime = "2016-03-19"',
        request: createRequestWithDatesFilter(ColumnDataType.Date, 'YYYY-MM-DD', CompareOperators.Equals, '2016-03-19'),
        expectedResults: 6,
    },
    {
        name: 'Date filtering with DateTime = "2016-03-19"',
        request: createRequestWithDatesFilter(
            ColumnDataType.DateTime,
            'YYYY-MM-DD',
            CompareOperators.Equals,
            '2016-03-19',
        ),
        expectedResults: 6,
    },
    {
        name: 'Date filtering with Date = "2016-03-19"',
        request: createRequestWithDatesFilter(
            ColumnDataType.DateTimeUtc,
            'YYYY-MM-DD',
            CompareOperators.Equals,
            '2016-03-19',
        ),
        expectedResults: 6,
    },
    {
        name: 'Date filtering with DateTime before "2016-03-19"',
        request: createRequestWithDatesFilter(ColumnDataType.Date, 'YYYY-MM-DD', CompareOperators.Lt, '2016-03-19'),
        expectedResults: 2,
    },
    {
        name: 'Date filtering with DateTime before "2016-03-19"',
        request: createRequestWithDatesFilter(ColumnDataType.DateTime, 'YYYY-MM-DD', CompareOperators.Lt, '2016-03-19'),
        expectedResults: 2,
    },
    {
        name: 'Date filtering with DateTime before "2016-03-19"',
        request: createRequestWithDatesFilter(
            ColumnDataType.DateTimeUtc,
            'YYYY-MM-DD',
            CompareOperators.Lt,
            '2016-03-19',
        ),
        expectedResults: 2,
    },
    {
        name: 'Date filtering with DateTime after "2016-03-19"',
        request: createRequestWithDatesFilter(ColumnDataType.Date, 'YYYY-MM-DD', CompareOperators.Gt, '2016-03-19'),
        expectedResults: 14,
    },
    {
        name: 'Date filtering with DateTime after "2016-03-19"',
        request: createRequestWithDatesFilter(ColumnDataType.DateTime, 'YYYY-MM-DD', CompareOperators.Gt, '2016-03-19'),
        expectedResults: 14,
    },
    {
        name: 'Date filtering with DateTime after "2016-03-19"',
        request: createRequestWithDatesFilter(
            ColumnDataType.DateTimeUtc,
            'YYYY-MM-DD',
            CompareOperators.Gt,
            '2016-03-19',
        ),
        expectedResults: 14,
    },
    {
        name: 'Date filtering with DateTime after "2016-03-19"',
        request: createRequestWithDatesFilter(ColumnDataType.Date, 'YYYY-MM-DD', CompareOperators.Gte, '2016-03-19'),
        expectedResults: 20,
    },
    {
        name: 'Date filtering with DateTime after "2016-03-19"',
        request: createRequestWithDatesFilter(
            ColumnDataType.DateTime,
            'YYYY-MM-DD',
            CompareOperators.Gte,
            '2016-03-19',
        ),
        expectedResults: 20,
    },
    {
        name: 'Date filtering with DateTime after "2016-03-19"',
        request: createRequestWithDatesFilter(
            ColumnDataType.DateTimeUtc,
            'YYYY-MM-DD',
            CompareOperators.Gte,
            '2016-03-19',
        ),
        expectedResults: 20,
    },
];
