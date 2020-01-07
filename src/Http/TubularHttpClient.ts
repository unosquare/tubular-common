import GridResponse from '../Models/GridResponse';
import GridRequest from '../Models/GridRequest';
import { TubularHttpClientAbstract } from './TubularHttpClientAbstract';

const responseKeys = [
    'AggregationPayload',
    'Counter',
    'CurrentPage',
    'FilteredRecordCount',
    'Payload',
    'TotalPages',
    'TotalRecordCount',
];

const expectedStructureKeys = JSON.stringify([
    'aggregationPayload',
    'counter',
    'currentPage',
    'filteredRecordCount',
    'payload',
    'totalPages',
    'totalRecordCount',
]);

export class TubularHttpClient implements TubularHttpClientAbstract {
    public static resolveRequest(request: string | Request | TubularHttpClientAbstract): string | Request {
        const httpCast = request as TubularHttpClientAbstract;

        if (httpCast.request) {
            return httpCast.request;
        }

        return (request as Request) || (request as string);
    }

    public static getRequest(objRequest: string | Request, gridRequest: GridRequest): Request {
        if (typeof objRequest === 'string') {
            return new Request(objRequest, {
                body: JSON.stringify(gridRequest),
                headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8' }),
                method: 'POST',
            });
        }

        (objRequest as Request).headers.append('Content-Type', 'application/json;charset=utf-8');

        return new Request(objRequest.url, {
            body: JSON.stringify(gridRequest),
            headers: (objRequest as Request).headers,
            method: (objRequest as Request).method,
        });
    }

    public static isValidResponse(data: {}): boolean {
        return data && expectedStructureKeys === JSON.stringify(Object.keys(data).sort());
    }

    public request: string | Request;

    public constructor(request: string | Request | TubularHttpClientAbstract) {
        this.request = TubularHttpClient.resolveRequest(request);
    }

    public async fetch(gridRequest: GridRequest): Promise<GridResponse> {
        const response = await fetch(TubularHttpClient.getRequest(this.request, gridRequest));

        if (response.status >= 200 && response.status < 300) {
            const responseBody: string = await response.text();
            const responseObject: GridResponse = responseBody ? JSON.parse(responseBody) : {};

            responseKeys.forEach(k => {
                if (responseObject.hasOwnProperty(k)) {
                    responseObject[k.charAt(0).toLowerCase() + k.slice(1)] = responseObject[k];
                    delete responseObject[k];
                }
            });

            return responseObject;
        }

        throw new Error('Invalid request');
    }
}
