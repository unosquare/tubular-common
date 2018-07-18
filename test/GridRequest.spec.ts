import 'jasmine';
import { GridRequest } from '../src';

describe('New GridRequest instance', () => {
    it('should have default values', () => {
        const actual = new GridRequest(null, 1, 1);
        expect(actual.Counter).toBe(0);
        expect(actual.Skip).toBe(1);
        expect(actual.Take).toBe(1);
    });
});
