import { GridRequest } from '../src/Models/GridRequest';

describe('New GridRequest instance', () => {
    it('should have default values', () => {
        const actual = new GridRequest(null, 1, 1);

        expect(actual.skip).toBe(1);
        expect(actual.take).toBe(1);
    });
});
