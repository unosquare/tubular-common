import 'jasmine';
import { ColumnModel } from '../src';

describe('New ColumnModel instance', () => {
    it('should have property Visible = false values', () => {
        const actual = new ColumnModel('Test',
            {
                Visible: false
            }
        );

        expect(actual.Visible).toBeFalsy();
    });
});
