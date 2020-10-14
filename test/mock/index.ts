import { ColumnModel, ColumnDataType } from '../../src';
import { createColumn, GridRequest, ColumnSortDirection, AggregateFunctions, CompareOperators } from '../../src/Models';

export const mockColumnModel: ColumnModel = {
    aggregate: null,
    dataType: ColumnDataType.Boolean,
    filterArgument: [],
    filterOperator: null,
    filterText: '',
    filterable: false,
    isKey: false,
    label: '',
    name: '',
    searchable: false,
    sortDirection: null,
    sortOrder: 0,
    sortable: false,
    visible: false,
    exportable: false,
    dateOriginFormat: 'YYYY-MM-DD',
    dateDisplayFormat: 'YYYY-MM-DD',
    dateTimeOriginFormat: 'YYYY-MM-DDTHH:mm:ss',
    dateTimeDisplayFormat: 'YYYY-MM-DDTHH:mm:ss',
};

export const simpleRequestWithFilters1 = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            filterOperator: CompareOperators.Equals,
            filterArgument: [],
            filterText: '1',
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        createColumn('CustomerName', {
            aggregate: AggregateFunctions.None,
            dataType: ColumnDataType.String,
            filterOperator: CompareOperators.NotEquals,
            filterArgument: [],
            filterText: '',
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterOperator: CompareOperators.Contains,
            filterArgument: [],
            filterText: '/',
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity', {
            filterOperator: CompareOperators.NotContains,
            filterArgument: [],
            filterText: '*',
        }),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
            filterOperator: CompareOperators.StartsWith,
            filterArgument: [],
            filterText: '$',
        }),
    ],
    10,
    0,
    '',
);

export const simpleRequestWithFilters2 = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        createColumn('CustomerName', {
            aggregate: AggregateFunctions.None,
            filterOperator: CompareOperators.EndsWith,
            filterArgument: [],
            filterText: '0',
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterOperator: CompareOperators.NotEndsWith,
            filterArgument: [],
            filterText: '.',
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity', {
            filterOperator: CompareOperators.Gt,
            filterArgument: [],
            filterText: '*',
        }),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
            filterOperator: CompareOperators.Gte,
            filterArgument: [],
            filterText: '$',
        }),
    ],
    10,
    0,
    '',
);

export const simpleRequestWithFilters3 = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            filterOperator: CompareOperators.Lt,
            filterArgument: [],
            filterText: '_',
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        createColumn('CustomerName', {
            aggregate: AggregateFunctions.None,
            filterOperator: CompareOperators.Lte,
            filterArgument: [],
            filterText: '0',
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterOperator: CompareOperators.Gte,
            filterArgument: [],
            filterText: '05/02/2020',
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity', {
            filterOperator: CompareOperators.NotStartsWith,
            filterArgument: [],
            filterText: ',',
        }),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
            filterOperator: CompareOperators.Between,
            filterArgument: [0, 10000],
            filterText: '',
        }),
    ],
    10,
    0,
    '',
);

export const simpleRequestWithFilters4 = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        createColumn('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterOperator: CompareOperators.Gt,
            filterArgument: [],
            filterText: '0',
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity', {}),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

export const simpleRequestWithFilters5 = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        createColumn('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterOperator: CompareOperators.Between,
            filterArgument: ['00/00/0000', '12/12/2020'],
            filterText: '0',
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity', {}),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

export const simpleRequestWithFilters6 = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        createColumn('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            dateTimeOriginFormat: 'YYYY-MM-DD',
            filterOperator: CompareOperators.Lt,
            filterArgument: [],
            filterText: '2016-03-19',
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity', {}),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

export const createRequestWithDatesFilter = (
    dateType: ColumnDataType,
    originFormat: string,
    operator: CompareOperators,
    value: string,
): GridRequest =>
    new GridRequest(
        [
            createColumn('OrderID', {
                dataType: ColumnDataType.Numeric,
                isKey: true,
                label: 'Order ID',
                sortDirection: ColumnSortDirection.Ascending,
                sortOrder: 1,
                sortable: true,
            }),
            createColumn('CustomerName', {
                aggregate: AggregateFunctions.None,
                searchable: true,
                sortable: false,
            }),
            createColumn('ShippedDate', {
                dataType: dateType,
                dateTimeOriginFormat: originFormat,
                filterOperator: operator,
                filterArgument: [],
                filterText: value,
                filterable: true,
                sortable: false,
            }),
            createColumn('ShipperCity', {}),
            createColumn('Amount', {
                dataType: ColumnDataType.Numeric,
                sortable: false,
            }),
        ],
        100,
        0,
        '',
    );

export const simpleRequestWithFilters7 = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        createColumn('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterOperator: CompareOperators.Lte,
            filterArgument: [],
            filterText: '12/12/2020',
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity', {
            dataType: ColumnDataType.String,
            filterOperator: CompareOperators.Equals,
            filterText: 'simple',
        }),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
            filterOperator: CompareOperators.NotEquals,
            filterArgument: [],
            filterText: '0',
        }),
    ],
    10,
    0,
    '',
);
