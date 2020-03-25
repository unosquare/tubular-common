import { CompareOperators, FilterWrapper, ColumnDataType } from '../src';
import { createColumn, createFilterPatch } from '../src/Models/ColumnModel';

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

    it('should set filter information when filterable is true', () => {
        const filterData: FilterWrapper = {
            name: 'Test',
            operator: CompareOperators.Contains,
            text: 'Criteria',
        };

        const actual = createColumn('Test', {
            isKey: false,
            filterable: true,
            filter: filterData,
        });

        expect(actual.filter).toMatchObject(filterData);
    });

    it('should not set filter information when filterable is false', () => {
        const filterData: FilterWrapper = {
            name: 'Test',
            operator: CompareOperators.Contains,
            text: 'Criteria',
        };

        const actual = createColumn('Test', {
            isKey: true,
            filterable: false,
            filter: filterData,
        });

        expect(actual.filter).not.toMatchObject(filterData);
    });

    it('should set default filter information when no filter param', () => {
        const filterData: FilterWrapper = {
            name: 'Test',
            operator: CompareOperators.None,
            text: '',
        };

        const actual = createColumn('Test', {
            isKey: true,
            filterable: true,
        });

        expect(actual.filter).not.toMatchObject(filterData);
    });

    it('should create filter patch for String column', () => {
        const expected: FilterWrapper = {
            name: 'Test',
            operator: CompareOperators.None,
            text: null,
        };

        const column = createColumn('Test', {
            isKey: true,
            filterable: true,
        });

        const actual = createFilterPatch(column);

        expect(actual).toMatchObject(expected);
    });

    it('should create filter patch for Numeric column', () => {
        const expected: FilterWrapper = {
            name: 'Test',
            operator: CompareOperators.Equals,
            text: '10',
        };

        const column = createColumn('Test', {
            isKey: true,
            filterable: true,
            dataType: ColumnDataType.Numeric,
            filter: {
                operator: CompareOperators.Equals,
                text: '10',
                name: 'Test',
                argument: [null],
            },
        });

        const actual = createFilterPatch(column);

        expect(actual).toMatchObject(expected);
    });

    it('should create filter patch for Boolean column', () => {
        const expected: FilterWrapper = {
            name: 'Test',
            operator: CompareOperators.Equals,
            text: 'true',
        };

        const column = createColumn('Test', {
            isKey: true,
            filterable: true,
            dataType: ColumnDataType.Boolean,
            filter: {
                operator: CompareOperators.Equals,
                text: 'true',
                name: 'Test',
            },
        });

        const actual = createFilterPatch(column);

        expect(actual).toMatchObject(expected);
    });
});
