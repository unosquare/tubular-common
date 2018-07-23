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
    pageSize20Response, payloadWithMisisngValuesResponse, searcTexthMicrosoftResponse, simpleResponse
} from './utils/responses';

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

describe('Transformer', () => {
    cases.forEach((i) =>
        it(`should return response ${i.name}`,
            () => expect({ ...Transformer.getResponse(i.request, localData) }).toEqual(i.response)));

    it('Should accept payload with missing Values', () => {
        expect(
            { ...Transformer.getResponse(simpleRequest, payloadUndefined) }).toEqual(payloadWithMisisngValuesResponse);
    });
});
