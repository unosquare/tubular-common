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
    aggregateAverageMisisngValuesResponse, aggregateCountMisisngValuesResponse, aggregateDistinctMisisngValuesResponse,
    aggregateMaxMisisngValuesResponse, aggregateMinMisisngValuesResponse, aggregateSumtMisisngValuesResponse,
    descendingMisisngValuesResponse, page2WithMisisngValuesResponse, pageMinus1MinMisisngValuesResponse,
    pageSize20WithMisisngValuesResponse, payloadWithMisisngValuesResponse, searcTexthMicrosoftMisisngValuesResponse
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

const casesWhitMissingValues = [
    { name: 'WhitMissingValues simple', request: simpleRequest, response: payloadWithMisisngValuesResponse },
    { name: 'WhitMissingValues with Page 2', request: page2Request, response: page2WithMisisngValuesResponse },
    {
        name: 'WhitMissingValues with PageSize 20', request: pageSize20Request,
        response: pageSize20WithMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with SearchText Microsoft', request: microsoftSearchRequest,
        response: searcTexthMicrosoftMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with aggregate func COUNT', request: aggregateCountRequest,
        response: aggregateCountMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with aggregate func SUM', request: aggregateSumRequest,
        response: aggregateSumtMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with aggregate func AVERAGE', request: aggregateAverageRequest,
        response: aggregateAverageMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with aggregate func DISTINCT', request: aggregateDistinctRequest,
        response: aggregateDistinctMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with aggregate func MAX', request: aggregateMaxRequest,
        response: aggregateMaxMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with aggregate func MIN', request: aggregateMinRequest,
        response: aggregateMinMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with Page -1', request: pageMinus1Request,
        response: pageMinus1MinMisisngValuesResponse
    },
    {
        name: 'WhitMissingValues with Sort Id Descending', request: desendingOrderIdRequest,
        response: descendingMisisngValuesResponse
    },
];

describe('Transformer', () => {
    cases.forEach((i) =>
    it(`should return response ${i.name}`,
        () => expect({ ...Transformer.getResponse(i.request, localData) }).toEqual(i.response)));

    casesWhitMissingValues.forEach((i) =>
        it(`should return response ${i.name}`,
            () => expect({ ...Transformer.getResponse(i.request, payloadUndefined) }).toEqual(i.response)));
});
