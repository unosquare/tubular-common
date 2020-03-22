import { ColumnModel, CompareOperators, FilterWrapper } from '../src';

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

    it('should set filter information when filterable is true', () => {
        const filterData: FilterWrapper = {
            hasFilter: true,
            name: 'Test',
            operator: CompareOperators.Contains,
            text: 'Criteria',
        };

        const actual = new ColumnModel('Test', {
            isKey: false,
            filterable: true,
            filter: filterData,
        });

        expect(actual.filter).toMatchObject(filterData);
    });

    it('should not set filter information when filterable is false', () => {
        const filterData: FilterWrapper = {
            hasFilter: true,
            name: 'Test',
            operator: CompareOperators.Contains,
            text: 'Criteria',
        };

        const actual = new ColumnModel('Test', {
            isKey: true,
            filterable: false,
            filter: filterData,
        });

        expect(actual.filter).not.toMatchObject(filterData);
    });

    it('should set default filter information when no filter param', () => {
        const filterData: FilterWrapper = {
            hasFilter: false,
            name: 'Test',
            operator: CompareOperators.None,
            text: '',
        };

        const actual = new ColumnModel('Test', {
            isKey: true,
            filterable: true,
        });

        expect(actual.filter).not.toMatchObject(filterData);
    });
});
