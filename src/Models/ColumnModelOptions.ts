import { AggregateFunctions, ColumnDataType, ColumnSortDirection } from './Column';

export default interface ColumnModelOptions {
    aggregate?: AggregateFunctions;
    dataType?: ColumnDataType;
    filterable?: boolean;
    isKey?: boolean;
    label?: string;
    searchable?: boolean;
    sortDirection?: ColumnSortDirection;
    sortOrder?: number;
    sortable?: boolean;
    visible?: boolean;
}
