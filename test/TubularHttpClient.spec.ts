/**
 * @jest-environment jsdom
 */

import { TubularHttpClient } from '../src';
import { simpleRequest } from './utils/requests';

describe('TubularHttpClient', () => {
    it('getRequest returns Request when string', () => {
        const result = TubularHttpClient.getRequest('', simpleRequest);
        expect(result).toBeInstanceOf(Request);
    });

    it('resolveRequest returns the same string when a string param', () => {
        const result = TubularHttpClient.resolveRequest('');
        expect(result).toBe('');
    });
});
