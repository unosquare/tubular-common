export enum ColumnDataType {
    String = 'string',
    Numeric = 'numeric',
    Boolean = 'boolean',
    Date = 'date',
    DateTime = 'datetime',
    DateTimeUtc = 'datetimeutc',
}

export enum ColumnSortDirection {
    None = 'None',
    Ascending = 'Ascending',
    Descending = 'Descending',
}

export enum CompareOperators {
    None = 'None',
    Auto = 'Auto',
    Equals = 'Equals',
    NotEquals = 'NotEquals',
    Contains = 'Contains',
    StartsWith = 'StartsWith',
    EndsWith = 'EndsWith',
    Gte = 'Gte',
    Gt = 'Gt',
    Lte = 'Lte',
    Lt = 'Lt',
    Between = 'Between',
    NotContains = 'NotContains',
    NotStartsWith = 'NotStartsWith',
    NotEndsWith = 'NotEndsWith',
}

export enum AggregateFunctions {
    None = 'None',
    Sum = 'Sum',
    Average = 'Average',
    Count = 'Count',
    DistinctCount = 'DistinctCount',
    Max = 'Max',
    Min = 'Min',
}
