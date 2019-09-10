import GridRequest from '../Models/GridRequest';

export interface ITubularHttpClient {
    request: string | Request;

    fetch(gridRequest: GridRequest): Promise<any>;
}
