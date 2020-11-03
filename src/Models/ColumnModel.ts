import { AggregateFunctions, ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';

export interface ColumnModel {
    aggregate: AggregateFunctions;
    dataType: ColumnDataType;
    dateOriginFormat?: string; // YYYY-MM-DD (default)
    dateDisplayFormat?: string; // YYYY-MM-DD (default)
    dateTimeOriginFormat?: string; // YYYY-MM-DDTHH:mm:ss (default)
    dateTimeDisplayFormat?: string; // YYYY-MM-DDTHH:mm:ss (default)
    filterArgument: string[] | number[];
    filterOperator: CompareOperators;
    filterText: string;
    filterable: boolean;
    exportable: boolean;
    isKey: boolean;
    label: string;
    isComputed: boolean;
    getComputedStringValue?: (column: ColumnModel, row: any, isHeader: boolean) => string;
    name: string;
    searchable: boolean;
    sortDirection: ColumnSortDirection;
    sortOrder: number;
    sortable: boolean;
    visible: boolean;
}
