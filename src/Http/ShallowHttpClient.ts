import type GridRequest from '../Models/GridRequest';
import type GridResponse from '../Models/GridResponse';
import type TubularHttpClientAbstract from './TubularHttpClientAbstract';

export type FetchHandler = (request: string, gridRequest: GridRequest) => Promise<GridResponse>;

class ShallowHttpClient implements TubularHttpClientAbstract {
    public request: string;

    public handler: FetchHandler;

    public constructor(url: string, handler: FetchHandler) {
        this.request = url;
        this.handler = handler;
    }

    public fetch(gridRequest: GridRequest): Promise<GridResponse> {
        return this.handler(this.request, gridRequest);
    }
}

export default ShallowHttpClient;
