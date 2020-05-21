import { AggregateFunctions, ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';

export interface ColumnModel {
    aggregate: AggregateFunctions;
    dataType: ColumnDataType;
    filterArgument: any[];
    filterOperator: CompareOperators;
    filterText: string;
    filterable: boolean;
    isKey: boolean;
    label: string;
    name: string;
    searchable: boolean;
    sortDirection: ColumnSortDirection;
    sortOrder: number;
    sortable: boolean;
    visible: boolean;
}
