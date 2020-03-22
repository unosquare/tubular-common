import { AggregateFunctions, ColumnDataType, ColumnSortDirection } from './Column';
import { FilterWrapper } from './FilterWrapper';

export default interface ColumnModelOptions {
    aggregate?: AggregateFunctions;
    dataType?: ColumnDataType;
    filterable?: boolean;
    filter?: FilterWrapper;
    isKey?: boolean;
    label?: string;
    searchable?: boolean;
    sortDirection?: ColumnSortDirection;
    sortOrder?: number;
    sortable?: boolean;
    visible?: boolean;
}
