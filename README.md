[![Build Status](https://travis-ci.org/unosquare/tubular-common.svg?branch=master)](https://travis-ci.org/unosquare/tubular-common)

![Tubular Common](http://unosquare.github.io/tubular/assets/tubular.png)

:star: *Please star this project if you find it useful!*

Tubular Common provides TypeScript and Javascript models and data transformer to use any Tubular DataGrid component with an array of Javascript objects. 

Please visit the [Tubular GitHub Page](http://unosquare.github.io/tubular) to learn how quickly you can start coding. See [Related projects](#related-projects) below to discover more Tubular libraries and backend solutions.

## Installation [![npm version](https://badge.fury.io/js/tubular-common.svg)](https://badge.fury.io/js/tubular-common)

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
    new ColumnModel('OrderID',
      {
        DataType: ColumnDataType.NUMERIC,
        Filterable: true,
        IsKey: true,
        Label: 'Order ID',
        SortDirection: ColumnSortDirection.ASCENDING,
        SortOrder: 1,
        Sortable: true,
      }
    ),
    new ColumnModel('CustomerName',
      {
        Aggregate: AggregateFunctions.NONE,
        Searchable: true,
        Sortable: false
      }
    ),
    new ColumnModel('ShippedDate',
      {
        DataType: ColumnDataType.DATE_TIME,
        Filterable: true,
        Sortable: false
      }
    ),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount',
      {
        DataType: ColumnDataType.NUMERIC,
        Sortable: false
      }
    )
  ],
  10, 0, '');

export const data = [
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
  /// ...
];

const response = Transformer.getResponse(request, data);
console.log(data);
```

The output is the following Javascript object:

```javascript
{
  AggregationPayload: { },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
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
  TotalPages: 3,
  TotalRecordCount: 22
};
```

### `ColumnModel` class

It represents a `DataGrid` column and its constructor requires a name identifier as well as an object of column options with the following properties:

| Name | Type | Default Value | Description | Options   |
|---------------|-------------------|-------------------------|--------------------------------------------------------------|----------|
| `Name`          | `string`              |         `NONE`          | This is required and represents a property of the entity which we are binding. |-|
| `Aggregate`     | `AggregateFunctions`  |         `NONE`          | The aggregation function that will be applied to this column. | `NONE`, `SUM`, `AVERAGE`, `COUNT`, `DISTINCT_COUNT`, `MAX`, `MIN` |
| `DataType`      | `ColumnDataType`      |       `STRING`          | The column type. | `STRING`, `NUMERIC`, `BOOLEAN`, `DATE`, `DATE_TIME`, `DATE_TIME_UTC` |
| `Filterable`        | `bool`                |        `false`          | Enables filtering.|-|
| `IsKey`         | `bool`                |        `false`          | Defines if a column is an identifier or not. |-|
| `Label`         | `string`              | The name of the column  | Column label that will be shown. |-|
| `Searchable`    | `bool`                |        `true`           | Indicates that a column can be used to search upon. |-|
| `SortDirection` |`ColumnSortDirection`  |        `NONE`           |-| `NONE`, `ASCENDING`, `DESCENDING` |
| `SortOrder`     | `number`              |         `-1`            |-|-|
| `Sortable`      | `bool`                |        `false`          | Determines if a column can be sorted. |-|
| `Visible`       | `bool`                |        `true`           | Specifies if a column should be shown. |-|

## Related Projects

Name | Type | Language/tech | Description
-----|------|---------------|--------------
| [Tubular for AngularJS (formerly Tubular)](https://github.com/unosquare/tubular) | Library | AngularJs | Tubular provides a set of directives and services using AngularJS as framework. |
| [Tubular for Angular6 (formerly Tubular2)](https://github.com/unosquare/tubular2) | Library | Angular6 | New Tubular2 with Angular6 (Angular2) and Angular Material 2.
| [Tubular React](https://github.com/unosquare/tubular-react) | Library | React | Tubular-React is a DataGrid component using Material-UI |
| [Tubular Common](https://github.com/unosquare/tubular-common) | Library | Javascript/Typescript | Tubular Common provides TypeScript and Javascript models and data transformer to use any Tubular DataGrid component with an array of Javascript objects. |
| [Tubular Dotnet](https://github.com/unosquare/tubular-dotnet) | Backend library | C#/.NET Core | Tubular provides .NET Framework and .NET Core Library to create REST service to use with Tubular Angular Components easily with any WebApi library (ASP.NET Web API for example). |
| [Tubular Nodejs](https://github.com/unosquare/tubular-nodejs) | Backend Library | Javascript | Tubular Node.js provides an easy way to integrate Tubular Angular Components easily with any Node.js WebApi library. |
| [Tubular Boilerplate C#](https://github.com/unosquare/tubular-boilerplate-csharp) | Boilerplate | C# | Tubular Directives Boilerplate (includes AngularJS and Bootstrap) |
| [Tubular Boilerplate](https://github.com/unosquare/tubular-boilerplate) | Boilerplate | Javascript/AngularJS | Tubular Directives Boilerplate (includes AngularJS and Bootstrap). |
| [Tubular ASP.NET Core 2.0 Boilerplate](https://github.com/unosquare/tubular-aspnet-core-boilerplate) | Boilerplate | C#/.NET Core | Tubular Directives Boilerplate (includes AngularJS and Bootstrap). |
