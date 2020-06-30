import { AggregateFunctions, ColumnDataType, ColumnSortDirection, GridRequest, createColumn } from '../../src/Models';

const simpleRequest = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const microsoftSearchRequest = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    'Microsoft',
);

const page2Request = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    1,
    '',
);

const pageSize20Request = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    20,
    0,
    '',
);

const desendingOrderIdRequest = new GridRequest(
    [
        createColumn('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Descending,
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateCountRequest = new GridRequest(
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
            aggregate: AggregateFunctions.Count,
            searchable: true,
            sortable: false,
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateSumRequest = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            aggregate: AggregateFunctions.Sum,
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateAverageRequest = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            aggregate: AggregateFunctions.Average,
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateDistinctRequest = new GridRequest(
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
        }),
        createColumn('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            aggregate: AggregateFunctions.DistinctCount,
            dataType: ColumnDataType.Numeric,
        }),
    ],
    10,
    0,
    '',
);

const aggregateMaxRequest = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            aggregate: AggregateFunctions.Max,
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateMinRequest = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            aggregate: AggregateFunctions.Min,
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const pageMinus1Request = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    -1,
    0,
    '',
);

const searchLocalRequest = new GridRequest(
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
            filterable: true,
            sortable: false,
        }),
        createColumn('ShipperCity'),
        createColumn('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    10,
    0,
    '',
);

export {
    aggregateAverageRequest,
    aggregateCountRequest,
    aggregateDistinctRequest,
    aggregateMaxRequest,
    aggregateMinRequest,
    aggregateSumRequest,
    desendingOrderIdRequest,
    microsoftSearchRequest,
    pageMinus1Request,
    page2Request,
    pageSize20Request,
    simpleRequest,
    searchLocalRequest
};
