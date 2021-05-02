import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';

interface TubularHttpClientAbstract {
    request: string | Request;

    fetch(gridRequest: GridRequest): Promise<GridResponse>;
}

export default TubularHttpClientAbstract;
