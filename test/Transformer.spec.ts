import 'jasmine';
import Transformer from '../src';
import { localData } from './utils/localData';
import { payloadUndefined } from './utils/payloadUndefined';
import {
    aggregateAverageRequest, aggregateCountRequest, aggregateDistinctRequest, aggregateMaxRequest,
    aggregateMinRequest, aggregateSumRequest,
    desendingOrderIdRequest, microsoftSearchRequest, page2Request, pageMinus1Request,
    pageSize20Request, simpleRequest,
} from './utils/requests';

import {
    aggregateAverageResponse, aggregateCountResponse, aggregateDistinctResponse, aggregateMaxResponse,
    aggregateMinResponse, aggregateSumResponse,
    descendingOrderIdResponse, page2Response, pageMinus1Response,
    pageSize20Response, searcTexthMicrosoftResponse, simpleResponse
} from './utils/responses';

import {
    aggregateAverageMissingValuesResponse, aggregateCountMissingValuesResponse, aggregateDistinctMissingValuesResponse,
    aggregateMaxMissingValuesResponse, aggregateMinMissingValuesResponse, aggregateSumtMissingValuesResponse,
    descendingMissingValuesResponse, page2WithMissingValuesResponse, pageMinus1MinMissingValuesResponse,
    pageSize20WithMissingValuesResponse, payloadWithMissingValuesResponse, searcTexthMicrosoftMissingValuesResponse
} from './utils/MissingValueResponses';

const cases = [
    { name: 'simple', request: simpleRequest, response: simpleResponse },
    { name: 'with Page 2', request: page2Request, response: page2Response },
    { name: 'with PageSize 20', request: pageSize20Request, response: pageSize20Response },
    { name: 'with SearchText Microsoft', request: microsoftSearchRequest, response: searcTexthMicrosoftResponse },
    { name: 'with Sort Id Descending', request: desendingOrderIdRequest, response: descendingOrderIdResponse },
    { name: 'with aggregate func COUNT', request: aggregateCountRequest, response: aggregateCountResponse },
    { name: 'with aggregate func SUM', request: aggregateSumRequest, response: aggregateSumResponse },
    { name: 'with aggregate func AVERAGE', request: aggregateAverageRequest, response: aggregateAverageResponse },
    { name: 'with aggregate func DISTINCT', request: aggregateDistinctRequest, response: aggregateDistinctResponse },
    { name: 'with aggregate func MAX', request: aggregateMaxRequest, response: aggregateMaxResponse },
    { name: 'with aggregate func MIN', request: aggregateMinRequest, response: aggregateMinResponse },
    { name: 'with Page -1', request: pageMinus1Request, response: pageMinus1Response }
];

const casesWithMissingValues = [
    { name: 'WithMissingValues simple', request: simpleRequest, response: payloadWithMissingValuesResponse },
    { name: 'WithMissingValues with Page 2', request: page2Request, response: page2WithMissingValuesResponse },
    {
        name: 'WithMissingValues with PageSize 20', request: pageSize20Request,
        response: pageSize20WithMissingValuesResponse
    },
    {
        name: 'WithMissingValues with SearchText Microsoft', request: microsoftSearchRequest,
        response: searcTexthMicrosoftMissingValuesResponse
    },
    {
        name: 'WithMissingValues with aggregate func COUNT', request: aggregateCountRequest,
        response: aggregateCountMissingValuesResponse
    },
    {
        name: 'WithMissingValues with aggregate func SUM', request: aggregateSumRequest,
        response: aggregateSumtMissingValuesResponse
    },
    {
        name: 'WithMissingValues with aggregate func AVERAGE', request: aggregateAverageRequest,
        response: aggregateAverageMissingValuesResponse
    },
    {
        name: 'WithMissingValues with aggregate func DISTINCT', request: aggregateDistinctRequest,
        response: aggregateDistinctMissingValuesResponse
    },
    {
        name: 'WithMissingValues with aggregate func MAX', request: aggregateMaxRequest,
        response: aggregateMaxMissingValuesResponse
    },
    {
        name: 'WithMissingValues with aggregate func MIN', request: aggregateMinRequest,
        response: aggregateMinMissingValuesResponse
    },
    {
        name: 'WithMissingValues with Page -1', request: pageMinus1Request,
        response: pageMinus1MinMissingValuesResponse
    },
    {
        name: 'WithMissingValues with Sort Id Descending', request: desendingOrderIdRequest,
        response: descendingMissingValuesResponse
    },
];

describe('Transformer', () => {
    cases.forEach((i) =>
    it(`should return response ${i.name}`,
        () => expect({ ...Transformer.getResponse(i.request, localData) }).toEqual(i.response)));

    casesWithMissingValues.forEach((i) =>
        it(`should return response ${i.name}`,
            () => expect({ ...Transformer.getResponse(i.request, payloadUndefined) }).toEqual(i.response)));
});
