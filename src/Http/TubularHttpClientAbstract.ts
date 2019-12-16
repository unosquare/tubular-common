import GridRequest from '../Models/GridRequest';

export interface TubularHttpClientAbstract {
    request: string | Request;

    fetch(gridRequest: GridRequest): Promise<{}>;
}
