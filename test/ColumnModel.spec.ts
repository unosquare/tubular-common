import { ColumnModel } from '../src';

describe('New ColumnModel instance', () => {
    it('should have property Visible = false values', () => {
        const actual = new ColumnModel('Test', {
            visible: false,
        });

        expect(actual.visible).toBeFalsy();
    });

    it('should have property Visible = true values', () => {
        const actual = new ColumnModel('Test', {
            isKey: true,
        });

        expect(actual.visible).toBeTruthy();
    });
});
