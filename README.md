[![Build Status](https://travis-ci.org/unosquare/tubular-common.svg?branch=master)](https://travis-ci.org/unosquare/tubular-common)

![Tubular Common](http://unosquare.github.io/tubular/assets/tubular.png)

:star: *Please star this project if you find it useful!*

Tubular Common provides TypeScript and Javascript models and data transformer to use any Tubular DataGrid component with an array of Javascript objects. 

Please visit the [Tubular GitHub Page](http://unosquare.github.io/tubular) to learn how quickly you can start coding. Don't forget to check out the Tubular Generator which quickly turns models into an awesome UIs!

## npm Installation [![npm version](https://badge.fury.io/js/tubular-common.svg)](https://badge.fury.io/js/tubular-common)

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
        IsKey: true,
        Label: 'Order ID',
        SortDirection: ColumnSortDirection.ASCENDING,
        SortOrder: 1,
        Sortable: true
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
        Filtering: true,
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
