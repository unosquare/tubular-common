import { AggregateFunctions, ColumnDataType, ColumnSortDirection } from './Column';

export default interface IColumnModelOptions {
    Aggregate?: AggregateFunctions;
    DataType?: ColumnDataType;
    Filterable?: boolean;
    IsKey?: boolean;
    Label?: string;
    Searchable?: boolean;
    SortDirection?: ColumnSortDirection;
    SortOrder?: number;
    Sortable?: boolean;
    Visible?: boolean;
}
