[![codecov](https://codecov.io/gh/unosquare/tubular-common/branch/master/graph/badge.svg)](https://codecov.io/gh/unosquare/tubular-common) 
[![npm version](https://badge.fury.io/js/tubular-common.svg)](https://badge.fury.io/js/tubular-common)

![Tubular Common](http://unosquare.github.io/tubular-angular/assets/tubular.png)

:star: _Please star this project if you find it useful!_

Tubular Common provides TypeScript and Javascript models and data transformer to use any Tubular DataGrid component with an array of Javascript objects.

Please visit the [Tubular GitHub Page](http://unosquare.github.io/tubular) to learn how quickly you can start coding. See [Related projects](#related-projects) below to discover more Tubular libraries and backend solutions.

## Installation

```sh
$ npm install tubular-common --save
```

## Usage

### Tranformer

The Transformer will resolve a Tubular Grid Request model and a dataset (array of objects) into a Tubulr Grid Response model. When using with another Tubular library (like Tubular React) the UI component should create the request object to transform a dataset in a response object ready to use in your UI.

The following code is a sample how use the request and response objects to tranform data:

```javascript
import Transformer from 'tubular-common';

const request = new GridRequest(
    [
        new ColumnModel('OrderID', {
            dataType: ColumnDataType.Numeric,
            filterable: true,
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
            dilterable: true,
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

export const data = [
    {
        OrderID: 1,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 300.0,
    },
    {
        OrderID: 2,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 9.0,
    },
    /// ...
];

const response = Transformer.getResponse(request, data);
console.log(data);
```

The output is the following Javascript object:

```javascript
{
  aggregationPayload: { },
  counter: 0,
  currentPage: 1,
  filteredRecordCount: 22,
  payload: [
    {
      OrderID: 1,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300.00
    },
    {
      OrderID: 2,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 9.00
    },
    {
      OrderID: 3,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 4,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 5,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 174.00
    },
    {
      OrderID: 6,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 7,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 8,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 15.00
    },
    {
      OrderID: 9,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 10,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    }
  ],
  totalPages: 3,
  totalRecordCount: 22
};
```

### `ColumnModel` class

It represents a `DataGrid` column and its constructor requires a name identifier as well as an object of column options with the following properties:

| Name            | Type                  | Default Value          | Description                                                                    | Options                                                              |
| --------------- | --------------------- | ---------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `name`          | `string`              |                        | This is required and represents a property of the entity which we are binding. | -                                                                    |
| `aggregate`     | `AggregateFunctions`  |                        | The aggregation function that will be applied to this column.                  | `None`, `Sum`, `Average`, `Count`, `DistinctCount`, `Max`, `Min`    |
| `dataType`      | `ColumnDataType`      | `String`               | The column type.                                                               | `String`, `Numeric`, `Boolean`, `Date`, `DateTime`, `DateTimeUtc` |
| `filterable`    | `bool`                | `false`                | Enables filtering.                                                             | -                                                                    |
| `isKey`         | `bool`                | `false`                | Defines if a column is an identifier or not.                                   | -                                                                    |
| `label`         | `string`              | The name of the column | Column label that will be shown.                                               | -                                                                    |
| `searchable`    | `bool`                | `true`                 | Indicates that a column can be used to search upon.                            | -                                                                    |
| `sortDirection` | `ColumnSortDirection` |                        | -                                                                              | `None`, `Ascending`, `Descending`                                    |
| `sortOrder`     | `number`              | `-1`                   | -                                                                              | -                                                                    |
| `sortable`      | `bool`                | `false`                | Determines if a column can be sorted.                                          | -                                                                    |
| `visible`       | `bool`                | `true`                 | Specifies if a column should be shown.                                         | -                                                                    |

## Related Projects

| Name                                                                                                 | Type            | Language/tech        | Description                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------- | --------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Tubular React Common](https://github.com/unosquare/tubular-react.common)                     | Library         | React            | React hooks to integrate with any Grid component.                                                                                                   |
| [Tubular React](https://github.com/unosquare/tubular-react)                                          | Library         | React                | Tubular-React is a DataGrid component using Material-UI                                                                                                                           |
| [Tubular Dotnet](https://github.com/unosquare/tubular-dotnet)                                        | Backend library | C#/.NET Core         | Tubular provides .NET Framework and .NET Core Library to create REST service to use with Tubular Angular Components easily with any WebApi library (ASP.NET Web API for example). |
| [Tubular Nodejs](https://github.com/unosquare/tubular-nodejs)                                        | Backend Library | Javascript           | Tubular Node.js provides an easy way to integrate Tubular Angular Components easily with any Node.js WebApi library.                                                              |
