import { AggregateFunctions, ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';
import { CompareOperator } from './CompareOperator';
import { ColumnModel } from './ColumnModel';
import dayjs = require('dayjs');
import customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const defaultOriginDateFormat = 'YYYY-MM-DD';
const defaultOriginDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
const defaultDisplayDateFormat = 'YYYY-MM-DD';
const defaultDisplayDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';

export const NumericOperators: CompareOperator[] = [
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.Between, title: 'Between' },
    { value: CompareOperators.Gte, title: '>=' },
    { value: CompareOperators.Gt, title: '>' },
    { value: CompareOperators.Lte, title: '<=' },
    { value: CompareOperators.Lt, title: '<' },
];

export const StringOperators: CompareOperator[] = [
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.NotEquals, title: 'Not Equals' },
    { value: CompareOperators.Contains, title: 'Contains' },
    { value: CompareOperators.NotContains, title: 'Not Contains' },
    { value: CompareOperators.StartsWith, title: 'Starts With' },
    { value: CompareOperators.NotStartsWith, title: 'Not Starts With' },
    { value: CompareOperators.EndsWith, title: 'Ends With' },
    { value: CompareOperators.NotEndsWith, title: 'Not Ends With' },
];

export const BooleanOperators: CompareOperator[] = [
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.NotEquals, title: 'Not Equals' },
];

export const getOperators = (column: ColumnModel): CompareOperator[] => {
    switch (column.dataType) {
        case ColumnDataType.String:
            return StringOperators;
        case ColumnDataType.Numeric:
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return NumericOperators;
        case ColumnDataType.Boolean:
            return BooleanOperators;
        default:
            return [];
    }
};

export const sortColumnArray = (columnName: string, columns: ColumnModel[], multiSort: boolean): ColumnModel[] => {
    const column = columns.find((c: ColumnModel) => c.name === columnName);

    if (!column) {
        return;
    }

    column.sortDirection =
        column.sortDirection === ColumnSortDirection.None
            ? ColumnSortDirection.Ascending
            : column.sortDirection === ColumnSortDirection.Ascending
            ? ColumnSortDirection.Descending
            : ColumnSortDirection.None;

    column.sortOrder = column.sortDirection === ColumnSortDirection.None ? -1 : Number.MAX_VALUE;

    if (!multiSort) {
        columns
            .filter((col: ColumnModel) => col.name !== columnName)
            .forEach((c: ColumnModel) => {
                c.sortOrder = -1;
                c.sortDirection = ColumnSortDirection.None;
            });
    }

    columns
        .filter((col: ColumnModel) => col.sortOrder > 0)
        .sort((a: ColumnModel, b: ColumnModel) =>
            a.sortOrder === b.sortOrder ? 0 : a.sortOrder > b.sortOrder ? 1 : -1,
        )
        .forEach((col: ColumnModel, i: number) => {
            col.sortOrder = i + 1;
        });

    return columns;
};

export const columnHasFilter = (column: ColumnModel): boolean =>
    (!!column.filterText || !!column.filterArgument) && column.filterOperator !== CompareOperators.None;

const defaultComputedCsvValueGetter = (_column: ColumnModel, _row: any, _isHeader = false) => '';

export const createColumn = (name: string, options?: Partial<ColumnModel>): ColumnModel => {
    const temp = options || {};
    const sortDirection = (temp.sortable && temp.sortDirection) || ColumnSortDirection.None;

    return {
        aggregate: temp.aggregate || AggregateFunctions.None,
        dataType: temp.dataType || ColumnDataType.String,
        dateDisplayFormat: temp.dateDisplayFormat || defaultDisplayDateFormat,
        dateOriginFormat: temp.dateOriginFormat || defaultOriginDateFormat,
        dateTimeDisplayFormat: temp.dateTimeDisplayFormat || defaultDisplayDateTimeFormat,
        dateTimeOriginFormat: temp.dateTimeOriginFormat || defaultOriginDateTimeFormat,
        getComputedStringValue: temp.getComputedStringValue || defaultComputedCsvValueGetter,
        isKey: !!temp.isKey,
        isComputed: temp.isComputed === undefined ? false : temp.isComputed,
        label: temp.label || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2'),
        name: name,
        searchable: !!temp.searchable,
        sortDirection: (temp.sortable && temp.sortDirection) || ColumnSortDirection.None,
        sortOrder: (sortDirection !== ColumnSortDirection.None && temp.sortOrder) || -1,
        sortable: !!temp.sortable,
        visible: temp.visible === undefined ? true : temp.visible,
        filterArgument: temp.filterArgument,
        filterOperator: temp.filterOperator,
        filterText: temp.filterText,
        filterable: temp.filterable === undefined ? false : temp.filterable,
        exportable: temp.exportable === undefined ? true : temp.exportable,
    };
};

export const isDateColum = (column: ColumnModel): boolean =>
    column.dataType === ColumnDataType.Date ||
    column.dataType === ColumnDataType.DateTime ||
    column.dataType === ColumnDataType.DateTimeUtc;

export const parseDateColumnValue = (column: ColumnModel, value: string): string => {
    if (!isDateColum(column) || !value) {
        return '';
    }

    switch (column.dataType) {
        case ColumnDataType.Date:
            return dayjs(value, column.dateOriginFormat).format(column.dateDisplayFormat);
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return dayjs(value, column.dateTimeOriginFormat).format(column.dateTimeDisplayFormat);
    }
};
