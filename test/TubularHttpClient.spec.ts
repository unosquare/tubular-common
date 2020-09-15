import { TubularHttpClient } from '../src';
import { simpleRequest } from './utils/requests';

describe('TubularHttpClient', () => {
    it('getRequest returns Request when string', () => {
        const result = TubularHttpClient.getRequest('', simpleRequest);
        expect(result).toBeInstanceOf(Request);
    });
});
