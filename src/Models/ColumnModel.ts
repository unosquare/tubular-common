import { AggregateFunctions, ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';

const NumericOperators: CompareOperator[] = [
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.Between, title: 'Between' },
    { value: CompareOperators.Gte, title: '>=' },
    { value: CompareOperators.Gt, title: '>' },
    { value: CompareOperators.Lte, title: '<=' },
    { value: CompareOperators.Lt, title: '<' },
];

const StringOperators: CompareOperator[] = [
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

const BooleanOperators: CompareOperator[] = [
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.NotEquals, title: 'Not Equals' },
];

export interface CompareOperator {
    value: CompareOperators;
    title: string;
}

export interface ColumnModel {
    aggregate: AggregateFunctions;
    dataType: ColumnDataType;
    filterArgument: any[];
    filterOperator: CompareOperators;
    filterText: string;
    filterable: boolean;
    isKey: boolean;
    label: string;
    name: string;
    searchable: boolean;
    sortDirection: ColumnSortDirection;
    sortOrder: number;
    sortable: boolean;
    visible: boolean;
}

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

export const columnHasFilter = (column): boolean =>
    column.filter && (column.filterText || column.filterArgument) && column.filterOperator !== CompareOperators.None;

export const createColumn = (name: string, options?: Partial<ColumnModel>): ColumnModel => {
    const sortDirection = (options && options.sortable && options.sortDirection) || ColumnSortDirection.None;

    return {
        aggregate: (options && options.aggregate) || AggregateFunctions.None,
        dataType: (options && options.dataType) || ColumnDataType.String,
        isKey: !!(options && options.isKey),
        label: (options && options.label) || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2'),
        name: name,
        searchable: !!(options && options.searchable),
        sortDirection: (options && options.sortable && options.sortDirection) || ColumnSortDirection.None,
        sortOrder: (options && sortDirection !== ColumnSortDirection.None && options.sortOrder) || -1,
        sortable: !!(options && options.sortable),
        visible: options && typeof options.visible === 'boolean' ? options.visible : true,
        filterArgument: options && options.filterArgument,
        filterOperator: options && options.filterOperator,
        filterText: options && options.filterText,
        filterable: (options && options.filterable) || false,
    };
};
