const searchTextMicrosoftNullValuesResponse = {
    aggregationPayload: {},
    counter: 1,
    currentPage: 1,
    filteredRecordCount: 3,
    payload: [
        {
            Amount: 9,
            CustomerName: 'Microsoft',
            OrderID: 2,
            ShippedDate: undefined,
            ShipperCity: 'Los Angeles, CA, USA',
        },
        {
            Amount: 300,
            CustomerName: 'Microsoft',
            OrderID: 16,
            ShippedDate: '2016-03-19T19:00:00',
            ShipperCity: 'Leon, GTO, Mexico',
        },
        {
            Amount: 92,
            CustomerName: 'Microsoft',
            OrderID: 18,
            ShippedDate: '2016-12-22T08:00:00',
            ShipperCity: 'Los Angeles, CA, USA',
        },
    ],
    totalPages: 1,
    totalRecordCount: 22,
};

export { searchTextMicrosoftNullValuesResponse };
