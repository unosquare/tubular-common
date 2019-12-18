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
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    0,
    'Microsoft',
);

const page2Request = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    1,
    '',
);

const pageSize20Request = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    20,
    0,
    '',
);

const desendingOrderIdRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.DESCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateCountRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.COUNT,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateSumRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            Aggregate: AggregateFunctions.SUM,
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateAverageRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            Aggregate: AggregateFunctions.AVERAGE,
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateDistinctRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            Aggregate: AggregateFunctions.DISTINCT_COUNT,
            DataType: ColumnDataType.NUMERIC,
        }),
    ],
    10,
    0,
    '',
);

const aggregateMaxRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            Aggregate: AggregateFunctions.MAX,
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const aggregateMinRequest = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            Aggregate: AggregateFunctions.MIN,
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
        }),
    ],
    10,
    0,
    '',
);

const pageMinus1Request = new GridRequest(
    [
        new ColumnModel('OrderID', {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true,
        }),
        new ColumnModel('CustomerName', {
            Aggregate: AggregateFunctions.NONE,
            Searchable: true,
            Sortable: false,
        }),
        new ColumnModel('ShippedDate', {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: false,
        }),
        new ColumnModel('ShipperCity'),
        new ColumnModel('Amount', {
            DataType: ColumnDataType.NUMERIC,
            Sortable: false,
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
