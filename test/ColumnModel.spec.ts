/**
 * @jest-environment jsdom
 */

import { createColumn } from '../src/Models';

describe('New ColumnModel instance', () => {
    it('should have property Visible = false values', () => {
        const actual = createColumn('Test', {
            visible: false,
        });

        expect(actual.visible).toBeFalsy();
    });

    it('should have property Visible = true values', () => {
        const actual = createColumn('Test', {
            isKey: true,
        });

        expect(actual.visible).toBeTruthy();
    });
});
