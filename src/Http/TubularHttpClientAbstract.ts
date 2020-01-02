import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';

export interface TubularHttpClientAbstract {
    request: string | Request;

    fetch(gridRequest: GridRequest): Promise<GridResponse>;
}
