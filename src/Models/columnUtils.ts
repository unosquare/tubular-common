import dayjs = require('dayjs');
import customParseFormat = require('dayjs/plugin/customParseFormat');
import { AggregateFunctions, ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';
import { CompareOperator } from './CompareOperator';
import { ColumnModel } from './ColumnModel';

dayjs.extend(customParseFormat);

const defaultOriginDateFormat = 'YYYY-MM-DD';
const defaultOriginDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
const defaultDisplayDateFormat = 'YYYY-MM-DD';
const defaultDisplayDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';

const defaultComputedCsvValueGetter = (_column: ColumnModel, _row: any, _isHeader = false) => '';
const getSortDirectionFromOptions = (options: Partial<ColumnModel>): ColumnSortDirection =>
    (options.sortable && options.sortDirection) || ColumnSortDirection.None;
const getSortOrder = (sortDirection: ColumnSortDirection, options: Partial<ColumnModel>): number =>
    (sortDirection !== ColumnSortDirection.None && options.sortOrder) || -1;
const checkUndefined = (value: any, defaultValue = true) => (value === undefined ? defaultValue : value);

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

const getSortDirection = (sortDirection: ColumnSortDirection) => {
    if (sortDirection === ColumnSortDirection.None) return ColumnSortDirection.Ascending;
    return sortDirection === ColumnSortDirection.Ascending ? ColumnSortDirection.Descending : ColumnSortDirection.None;
};

export const sortColumnArray = (columnName: string, columns: ColumnModel[], multiSort: boolean): ColumnModel[] => {
    const column = columns.find((c: ColumnModel) => c.name === columnName);

    if (!column) {
        return undefined;
    }

    column.sortDirection = getSortDirection(column.sortDirection);
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
        .sort((a: ColumnModel, b: ColumnModel) => {
            if (a.sortOrder === b.sortOrder) return 0;
            return a.sortOrder > b.sortOrder ? 1 : -1;
        })
        .forEach((col: ColumnModel, i: number) => {
            col.sortOrder = i + 1;
        });

    return columns;
};

export const columnHasFilter = (column: ColumnModel): boolean =>
    (!!column.filterText || !!column.filterArgument) && column.filterOperator !== CompareOperators.None;

export const createColumn = (name: string, options?: Partial<ColumnModel>): ColumnModel => {
    const temp = options || {};
    const sortDirection = getSortDirectionFromOptions(temp);

    return {
        aggregate: temp.aggregate || AggregateFunctions.None,
        dataType: temp.dataType || ColumnDataType.String,
        dateDisplayFormat: temp.dateDisplayFormat || defaultDisplayDateFormat,
        dateOriginFormat: temp.dateOriginFormat || defaultOriginDateFormat,
        dateTimeDisplayFormat: temp.dateTimeDisplayFormat || defaultDisplayDateTimeFormat,
        dateTimeOriginFormat: temp.dateTimeOriginFormat || defaultOriginDateTimeFormat,
        getComputedStringValue: temp.getComputedStringValue || defaultComputedCsvValueGetter,
        isKey: !!temp.isKey,
        isComputed: checkUndefined(temp.isComputed, false),
        label: temp.label || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2'),
        name,
        searchable: !!temp.searchable,
        sortDirection,
        sortOrder: getSortOrder(sortDirection, temp),
        sortable: !!temp.sortable,
        visible: checkUndefined(temp.visible),
        filterArgument: temp.filterArgument,
        filterOperator: temp.filterOperator,
        filterText: temp.filterText,
        filterable: checkUndefined(temp.filterable, false),
        exportable: checkUndefined(temp.exportable),
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
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return dayjs(value, column.dateTimeOriginFormat).format(column.dateTimeDisplayFormat);
        default:
            return dayjs(value, column.dateOriginFormat).format(column.dateDisplayFormat);
    }
};
