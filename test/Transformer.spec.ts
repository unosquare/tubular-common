/**
 * @jest-environment jsdom
 */

import { localData } from './utils/localData';
import { payloadUndefined } from './utils/payloadUndefined';
import {
    aggregateAverageRequest,
    aggregateCountRequest,
    aggregateDistinctRequest,
    aggregateMaxRequest,
    aggregateMinRequest,
    aggregateSumRequest,
    desendingOrderIdRequest,
    microsoftSearchRequest,
    page2Request,
    pageMinus1Request,
    pageSize20Request,
    simpleRequest,
} from './utils/requests';

import {
    aggregateAverageResponse,
    aggregateCountResponse,
    aggregateDistinctResponse,
    aggregateMaxResponse,
    aggregateMinResponse,
    aggregateSumResponse,
    descendingOrderIdResponse,
    page2Response,
    pageMinus1Response,
    pageSize20Response,
    searchTextMicrosoftResponse,
    simpleResponse,
} from './utils/responses';

import {
    aggregateAverageMissingValuesResponse,
    aggregateCountMissingValuesResponse,
    aggregateDistinctMissingValuesResponse,
    aggregateMaxMissingValuesResponse,
    aggregateMinMissingValuesResponse,
    aggregateSumMissingValuesResponse,
    descendingMissingValuesResponse,
    page2WithMissingValuesResponse,
    pageMinus1MinMissingValuesResponse,
    pageSize20WithMissingValuesResponse,
    payloadWithMissingValuesResponse,
    searchTextMicrosoftMissingValuesResponse,
} from './utils/responsesUndefined';
import Transformer from '../src/Transformer';
import {
    simpleRequestWithFilters1,
    simpleRequestWithFilters2,
    simpleRequestWithFilters3,
    simpleRequestWithFilters4,
    simpleRequestWithFilters5,
    simpleRequestWithFilters6,
    simpleRequestWithFilters7,
} from './mock';
import { filterDateCases } from './utils/filterDateCases';
import { payloadNull } from './utils/payloadNullValues';
import { searchTextMicrosoftNullValuesResponse } from './responsesNull';

const casesWithFilter = [
    { name: 'simple', request: simpleRequestWithFilters1, response: simpleResponse },
    { name: 'simple', request: simpleRequestWithFilters2, response: simpleResponse },
    { name: 'simple', request: simpleRequestWithFilters3, response: simpleResponse },
    { name: 'simple', request: simpleRequestWithFilters4, response: simpleResponse },
    { name: 'simple', request: simpleRequestWithFilters5, response: simpleResponse },
    { name: 'simple', request: simpleRequestWithFilters6, response: simpleResponse },
    { name: 'simple', request: simpleRequestWithFilters7, response: simpleResponse },
];

const cases = [
    { name: 'simple', request: simpleRequest, response: simpleResponse },
    { name: 'with Page 2', request: page2Request, response: page2Response },
    { name: 'with PageSize 20', request: pageSize20Request, response: pageSize20Response },
    { name: 'with SearchText Microsoft', request: microsoftSearchRequest, response: searchTextMicrosoftResponse },
    { name: 'with Sort Id Descending', request: desendingOrderIdRequest, response: descendingOrderIdResponse },
    { name: 'with aggregate func COUNT', request: aggregateCountRequest, response: aggregateCountResponse },
    { name: 'with aggregate func SUM', request: aggregateSumRequest, response: aggregateSumResponse },
    { name: 'with aggregate func AVERAGE', request: aggregateAverageRequest, response: aggregateAverageResponse },
    { name: 'with aggregate func DISTINCT', request: aggregateDistinctRequest, response: aggregateDistinctResponse },
    { name: 'with aggregate func MAX', request: aggregateMaxRequest, response: aggregateMaxResponse },
    { name: 'with aggregate func MIN', request: aggregateMinRequest, response: aggregateMinResponse },
    { name: 'with Page -1', request: pageMinus1Request, response: pageMinus1Response },
];

const casesWithMissingValues = [
    { name: 'simple', request: simpleRequest, response: payloadWithMissingValuesResponse },
    { name: 'with Page 2', request: page2Request, response: page2WithMissingValuesResponse },
    {
        name: 'with PageSize 20',
        request: pageSize20Request,
        response: pageSize20WithMissingValuesResponse,
    },
    {
        name: 'with SearchText Microsoft',
        request: microsoftSearchRequest,
        response: searchTextMicrosoftMissingValuesResponse,
    },
    {
        name: 'with aggregate func COUNT',
        request: aggregateCountRequest,
        response: aggregateCountMissingValuesResponse,
    },
    {
        name: 'with aggregate func SUM',
        request: aggregateSumRequest,
        response: aggregateSumMissingValuesResponse,
    },
    {
        name: 'with aggregate func AVERAGE',
        request: aggregateAverageRequest,
        response: aggregateAverageMissingValuesResponse,
    },
    {
        name: 'with aggregate func DISTINCT',
        request: aggregateDistinctRequest,
        response: aggregateDistinctMissingValuesResponse,
    },
    {
        name: 'with aggregate func MAX',
        request: aggregateMaxRequest,
        response: aggregateMaxMissingValuesResponse,
    },
    {
        name: 'with aggregate func MIN',
        request: aggregateMinRequest,
        response: aggregateMinMissingValuesResponse,
    },
    {
        name: 'with Page -1',
        request: pageMinus1Request,
        response: pageMinus1MinMissingValuesResponse,
    },
    {
        name: 'with Sort Id Descending',
        request: desendingOrderIdRequest,
        response: descendingMissingValuesResponse,
    },
];

describe('Transformer', () => {
    it.each(cases)('should return response %s', (i) =>
        expect({ ...Transformer.getResponse(i.request, localData) }).toEqual(i.response),
    );

    it.each(casesWithFilter)('should return response %s', (i) => {
        const result = Transformer.getResponse(i.request, localData);
        expect(result).not.toBeNull();
    });

    it.each(filterDateCases)('should return rows: %s', (i) => {
        const result = Transformer.getResponse(i.request, localData);
        expect(result).not.toBeNull();
        expect(result.payload.length).toBe(i.expectedResults);
    });

    it.each(casesWithMissingValues)('should return response with missing data and %s', (i) =>
        expect({ ...Transformer.getResponse(i.request, payloadUndefined) }).toEqual(i.response),
    );

    it('should handle free text search with null values', () => {
        expect({ ...Transformer.getResponse(microsoftSearchRequest, payloadNull) }).toEqual(searchTextMicrosoftNullValuesResponse);
    });
});
