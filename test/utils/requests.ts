import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from '../../src/Models';
import GridRequest from '../../src/Models/GridRequest';

const simpleRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Descending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.Count,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
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
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            isKey: true,
            label: 'Order ID',
            sortDirection: ColumnSortDirection.Ascending,
            sortOrder: 1,
            sortable: true,
        }),
        new ColumnModel('CustomerName', {
            aggregate: AggregateFunctions.None,
            searchable: true,
            sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            dataType: ColumnDataType.DateTime,
            filterable: true,
            sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            dataType: ColumnDataType.Numeric,
            sortable: false,
        }),
    ],
    -1,
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
};
