import type GridRequest from '../Models/GridRequest';
import type GridResponse from '../Models/GridResponse';

interface TubularHttpClientAbstract {
    request: string | Request;

    fetch(gridRequest: GridRequest): Promise<GridResponse>;
}

export default TubularHttpClientAbstract;
