const payloadWithMisisngValuesResponse = {
    AggregationPayload: {},
    Counter: 0,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [{
        OrderID: 1,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: undefined
    },
    {
        OrderID: undefined,
        CustomerName: 'OXXO',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 92.00
    },
    {
        OrderID: 2,
        CustomerName: 'Microsoft',
        ShippedDate: undefined,
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 9.00
    },
    {
        OrderID: 3,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: undefined,
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
        CustomerName: undefined,
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
        OrderID: 10,
        CustomerName: undefined,
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 300.00
    }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const page2WithMisisngValuesResponse = {
    AggregationPayload: {},
    Counter: 2,
    CurrentPage: 2,
    FilteredRecordCount: 22,
    Payload: [
        {
            OrderID: 6,
            CustomerName: 'OXXO',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 92.00
        },
        {
            OrderID: 12,
            CustomerName: undefined,
            ShippedDate: '2016-11-08T18:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 92.00
        },
        {
            OrderID: 13,
            CustomerName: 'Unosquare LLC',
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Portland, OR, USA',
            Amount: 300.00
        },
        {
            OrderID: 14,
            CustomerName: 'Vesta',
            ShippedDate: '2016-04-23T10:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 60.00
        },
        {
            OrderID: 15,
            CustomerName: 'Super La Playa',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Portland, OR, US',
            Amount: 192.00
        },
        {
            OrderID: 16,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 300.00
        },
        {
            OrderID: 17,
            CustomerName: 'Unosquare LLC',
            ShippedDate: '2016-04-23T10:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 108.00
        },
        {
            OrderID: 18,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Los Angeles, CA, USA',
            Amount: 92.00
        },
        {
            OrderID: 19,
            CustomerName: 'Vesta',
            ShippedDate: '2016-11-08T18:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 300.00
        },
        {
            OrderID: 20,
            CustomerName: 'OXXO',
            ShippedDate: '2016-11-04T18:00:00',
            ShipperCity: 'Portland, OR, USA',
            Amount: 78.00
        }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const pageSize20WithMisisngValuesResponse = {
    AggregationPayload: {},
    Counter: 3,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        {
            OrderID: 1,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: undefined
        },
        {
            OrderID: undefined,
            CustomerName: 'OXXO',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 92.00
        },
        {
            OrderID: 2,
            CustomerName: 'Microsoft',
            ShippedDate: undefined,
            ShipperCity: 'Los Angeles, CA, USA',
            Amount: 9.00
        },
        {
            OrderID: 3,
            CustomerName: 'Unosquare LLC',
            ShippedDate: '2016-11-08T18:00:00',
            ShipperCity: undefined,
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
            CustomerName: undefined,
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
            OrderID: 10,
            CustomerName: undefined,
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Portland, OR, USA',
            Amount: 300.00
        },
        {
            OrderID: 11,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-04-23T10:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 16.00
        },
        {
            OrderID: 12,
            CustomerName: undefined,
            ShippedDate: '2016-11-08T18:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 92.00
        },
        {
            OrderID: 13,
            CustomerName: 'Unosquare LLC',
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Portland, OR, USA',
            Amount: 300.00
        },
        {
            OrderID: 14,
            CustomerName: 'Vesta',
            ShippedDate: '2016-04-23T10:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 60.00
        },
        {
            OrderID: 15,
            CustomerName: 'Super La Playa',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Portland, OR, US',
            Amount: 192.00
        },
        {
            OrderID: 16,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 300.00
        },
        {
            OrderID: 17,
            CustomerName: 'Unosquare LLC',
            ShippedDate: '2016-04-23T10:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 108.00
        },
        {
            OrderID: 18,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Los Angeles, CA, USA',
            Amount: 92.00
        },
        {
            OrderID: 19,
            CustomerName: 'Vesta',
            ShippedDate: '2016-11-08T18:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 300.00
        },
        {
            OrderID: 20,
            CustomerName: 'OXXO',
            ShippedDate: '2016-11-04T18:00:00',
            ShipperCity: 'Portland, OR, USA',
            Amount: 78.00
        }
    ],
    TotalPages: 2,
    TotalRecordCount: 22
};

const searcTexthMicrosoftMisisngValuesResponse = {
    AggregationPayload: {},
    Counter: 1,
    CurrentPage: 1,
    FilteredRecordCount: 5,
    Payload: [
        {
            Amount: undefined, CustomerName: 'Microsoft', OrderID: 1,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 9, CustomerName: 'Microsoft', OrderID: 2,
            ShippedDate: undefined, ShipperCity: 'Los Angeles, CA, USA'
        },
        {
            Amount: 16, CustomerName: 'Microsoft', OrderID: 11,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'
        }
    ],
    TotalPages: 1,
    TotalRecordCount: 22
};
const descendingMisisngValuesResponse = {
    AggregationPayload: {},
    Counter: 4,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        {
            Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
            ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'
        },
        {
            Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
            ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 78, CustomerName: 'OXXO', OrderID: 20,
            ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'
        },
        {
            Amount: 300, CustomerName: 'Vesta', OrderID: 19,
            ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'
        },
        {
            Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'
        },
        {
            Amount: 60, CustomerName: 'Vesta', OrderID: 14,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'
        }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const aggregateCountMisisngValuesResponse = {
    AggregationPayload: { CustomerName: 22 },
    Counter: 5,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        {
            Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
            ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'
        },
        {
            Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
            ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 78, CustomerName: 'OXXO', OrderID: 20,
            ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'
        },
        {
            Amount: 300, CustomerName: 'Vesta', OrderID: 19,
            ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'
        },
        {
            Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'
        },
        {
            Amount: 60, CustomerName: 'Vesta', OrderID: 14,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'
        }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const aggregateSumtMisisngValuesResponse = {
    AggregationPayload: { Amount: 3162 },
    Counter: 6,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        { OrderID: 11,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-04-23T10:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 16 },
          { OrderID: undefined,
            CustomerName: 'OXXO',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 92 },
          { OrderID: 22,
            CustomerName: 'Tiempo Development',
            ShippedDate: '2016-01-04T18:00:00',
            ShipperCity: 'Monterrey, NL, Mexico',
            Amount: 150 },
          { OrderID: 21,
            CustomerName: 'Wizeline',
            ShippedDate: '2015-11-04T18:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 100 },
          { OrderID: 20,
            CustomerName: 'OXXO',
            ShippedDate: '2016-11-04T18:00:00',
            ShipperCity: 'Portland, OR, USA',
            Amount: 78 },
          { OrderID: 19,
            CustomerName: 'Vesta',
            ShippedDate: '2016-11-08T18:00:00',
            ShipperCity: 'Guadalajara, JAL, Mexico',
            Amount: 300 },
          { OrderID: 18,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Los Angeles, CA, USA',
            Amount: 92 },
          { OrderID: 17,
            CustomerName: 'Unosquare LLC',
            ShippedDate: '2016-04-23T10:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 108 },
          { OrderID: 16,
            CustomerName: 'Microsoft',
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
            Amount: 300 },
          { OrderID: 15,
            CustomerName: 'Super La Playa',
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Portland, OR, US',
            Amount: 192 }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const aggregateAverageMisisngValuesResponse = {
    AggregationPayload: { Amount: 143.72727272727272 },
    Counter: 7,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        {
            Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
            ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'
        },
        {
            Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
            ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 78, CustomerName: 'OXXO', OrderID: 20,
            ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'
        },
        {
            Amount: 300, CustomerName: 'Vesta', OrderID: 19,
            ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'
        },
        {
            Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'
        },
        {
            Amount: 60, CustomerName: 'Vesta', OrderID: 14,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'
        }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const aggregateDistinctMisisngValuesResponse = {
    AggregationPayload: { Amount: 13 },
    Counter: 8,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        {
            Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
            ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'
        },
        {
            Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
            ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 78, CustomerName: 'OXXO', OrderID: 20,
            ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'
        },
        {
            Amount: 300, CustomerName: 'Vesta', OrderID: 19,
            ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'
        },
        {
            Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'
        },
        {
            Amount: 60, CustomerName: 'Vesta', OrderID: 14,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'
        }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const aggregateMaxMisisngValuesResponse = {
    AggregationPayload: { Amount: 300 },
    Counter: 9,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        {
            Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
            ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'
        },
        {
            Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
            ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 78, CustomerName: 'OXXO', OrderID: 20,
            ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'
        },
        {
            Amount: 300, CustomerName: 'Vesta', OrderID: 19,
            ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'
        },
        {
            Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'
        },
        {
            Amount: 60, CustomerName: 'Vesta', OrderID: 14,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'
        }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const aggregateMinMisisngValuesResponse = {
    AggregationPayload: { Amount: 9 },
    Counter: 10,
    CurrentPage: 1,
    FilteredRecordCount: 22,
    Payload: [
        {
            Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
            ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'
        },
        {
            Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
            ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 78, CustomerName: 'OXXO', OrderID: 20,
            ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'
        },
        {
            Amount: 300, CustomerName: 'Vesta', OrderID: 19,
            ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'
        },
        {
            Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'
        },
        {
            Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
            ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'
        },
        {
            Amount: 60, CustomerName: 'Vesta', OrderID: 14,
            ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'
        },
        {
            Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
            ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'
        }
    ],
    TotalPages: 3,
    TotalRecordCount: 22
};

const pageMinus1MinMisisngValuesResponse = {
    AggregationPayload: {},
    Counter: 11,
    CurrentPage: 0,
    FilteredRecordCount: 22,
    Payload: [{
        OrderID: 1,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: undefined
    },
    {
        OrderID: undefined,
        CustomerName: 'OXXO',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 92.00
    },
    {
        OrderID: 2,
        CustomerName: 'Microsoft',
        ShippedDate: undefined,
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 9.00
    },
    {
        OrderID: 3,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: undefined,
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
        CustomerName: undefined,
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
        OrderID: 10,
        CustomerName: undefined,
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 300.00
    },
    {
        OrderID: 11,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 16.00
    },
    {
        OrderID: 12,
        CustomerName: undefined,
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 92.00
    },
    {
        OrderID: 13,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 300.00
    },
    {
        OrderID: 14,
        CustomerName: 'Vesta',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 60.00
    },
    {
        OrderID: 15,
        CustomerName: 'Super La Playa',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Portland, OR, US',
        Amount: 192.00
    },
    {
        OrderID: 16,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 300.00
    },
    {
        OrderID: 17,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 108.00
    },
    {
        OrderID: 18,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 92.00
    },
    {
        OrderID: 19,
        CustomerName: 'Vesta',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 300.00
    },
    {
        OrderID: 20,
        CustomerName: 'OXXO',
        ShippedDate: '2016-11-04T18:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 78.00
    },
    {
        OrderID: 21,
        CustomerName: 'Wizeline',
        ShippedDate: '2015-11-04T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 100.00
    }
    ],
    TotalPages: 1,
    TotalRecordCount: 22
};

export {
    aggregateMaxMisisngValuesResponse,
    aggregateMinMisisngValuesResponse,
    aggregateAverageMisisngValuesResponse,
    aggregateSumtMisisngValuesResponse,
    aggregateCountMisisngValuesResponse,
    aggregateDistinctMisisngValuesResponse,
    descendingMisisngValuesResponse,
    payloadWithMisisngValuesResponse,
    pageMinus1MinMisisngValuesResponse,
    page2WithMisisngValuesResponse,
    pageSize20WithMisisngValuesResponse,
    searcTexthMicrosoftMisisngValuesResponse
};
