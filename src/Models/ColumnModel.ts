import { AggregateFunctions, ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';
import IColumnModelOptions from './ColumnModelOptions';
import { FilterWrapper } from './FilterWrapper';

function filterProps(name: string): FilterWrapper {
    return {
        argument: [],
        hasFilter: false,
        name: name,
        operator: 'None',
        text: null,
    };
}

const NumericOperators = [
    { value: CompareOperators.NONE, title: 'None' },
    { value: CompareOperators.EQUALS, title: 'Equals' },
    { value: CompareOperators.BETWEEN, title: 'Between' },
    { value: CompareOperators.GTE, title: '>=' },
    { value: CompareOperators.GT, title: '>' },
    { value: CompareOperators.LTE, title: '<=' },
    { value: CompareOperators.LT, title: '<' },
];

const StringOperators = [
    { value: CompareOperators.NONE, title: 'None' },
    { value: CompareOperators.EQUALS, title: 'Equals' },
    { value: CompareOperators.NOT_EQUALS, title: 'Not Equals' },
    { value: CompareOperators.CONTAINS, title: 'Contains' },
    { value: CompareOperators.NOT_CONTAINS, title: 'Not Contains' },
    { value: CompareOperators.STARTS_WITH, title: 'Starts With' },
    { value: CompareOperators.NOT_STARTS_WITH, title: 'Not Starts With' },
    { value: CompareOperators.ENDS_WITH, title: 'Ends With' },
    { value: CompareOperators.NOT_ENDS_WITH, title: 'Not Ends With' },
];

const BooleanOperators = [
    { value: CompareOperators.NONE, title: 'None' },
    { value: CompareOperators.EQUALS, title: 'Equals' },
    { value: CompareOperators.NOT_EQUALS, title: 'Not Equals' },
];

export default class ColumnModel {
    public static createFilterPatch(column: ColumnModel): IFilterWrapper {
        let filterText = column.filter.text;
        let filterArgument = column.filter.argument[0];

        if (column.dataType === ColumnDataType.Numeric) {
            filterText = parseFloat(filterText).toString();
            filterArgument = parseFloat(filterArgument).toString();
        } else if (column.dataType === ColumnDataType.Boolean) {
            filterText = (filterText === 'true').toString();
            filterArgument = '';
        }

        return {
            Argument: [filterArgument],
            HasFilter: true,
            Operator: column.filter.operator || CompareOperators.AUTO,
            Text: filterText,
        };
    }

    public static getOperators(column: ColumnModel): any[] {
        switch (column.dataType) {
            case ColumnDataType.String:
                return StringOperators;
            case ColumnDataType.Numeric:
            case ColumnDataType.Date:
            case ColumnDataType.DateTime:
            case ColumnDataType.DateTimeUtc:
                return NumericOperators;
            case ColumnDataType.Boolean:
                return BooleanOperators;
            default:
                return [];
        }
    }

    public static sortColumnArray(columnName: string, columns: ColumnModel[], multiSort: boolean): ColumnModel[] {
        const column = columns.find((c: ColumnModel) => c.name === columnName);
        if (!column) {
            return;
        }

        column.sortDirection =
            column.sortDirection === ColumnSortDirection.NONE
                ? ColumnSortDirection.ASCENDING
                : column.sortDirection === ColumnSortDirection.ASCENDING
                ? ColumnSortDirection.DESCENDING
                : ColumnSortDirection.NONE;

        column.sortOrder = column.sortDirection === ColumnSortDirection.NONE ? -1 : Number.MAX_VALUE;

        if (!multiSort) {
            columns
                .filter((col: ColumnModel) => col.name !== columnName)
                .forEach((c: ColumnModel) => {
                    c.sortOrder = -1;
                    c.sortDirection = ColumnSortDirection.NONE;
                });
        }

        columns
            .filter((col: ColumnModel) => col.sortOrder > 0)
            .sort((a: ColumnModel, b: ColumnModel) =>
                a.sortOrder === b.sortOrder ? 0 : a.sortOrder > b.sortOrder ? 1 : -1,
            )
            .forEach((col: ColumnModel, i: number) => {
                col.sortOrder = i + 1;
            });

        return columns;
    }

    public static clearFilterPatch(): IFilterWrapper {
        return {
            argument: [''],
            hasFilter: false,
            operator: CompareOperators.NONE,
            text: '',
        };
    }

    public aggregate: AggregateFunctions;
    public dataType: ColumnDataType;
    public filter: FilterWrapper | { text?: string; argument: []; operator: CompareOperators; hasFilter: boolean };
    public filterable: boolean;
    public isKey: boolean;
    public label: string;
    public name: string;
    public searchable: boolean;
    public sortDirection: ColumnSortDirection;
    public sortOrder: number;
    public sortable: boolean;
    public visible: boolean;

    public hasFilter =
        this.filter && (this.filter.text || this.filter.argument) && this.filter.operator !== CompareOperators.NONE;

    constructor(name: string, options?: IColumnModelOptions) {
        this.aggregate = (options && options.aggregate) || AggregateFunctions.NONE;
        this.dataType = (options && options.dataType) || ColumnDataType.String;
        this.isKey = (options && options.isKey) || false;
        this.label = (options && options.label) || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2');
        this.name = name;
        this.searchable = (options && options.searchable) || false;
        this.sortDirection = (options && options.sortable && options.sortDirection) || ColumnSortDirection.NONE;
        this.sortOrder = (options && this.sortDirection !== ColumnSortDirection.NONE && options.sortOrder) || -1;
        this.sortable = (options && options.sortable) || false;
        this.visible = options && typeof options.visible === 'boolean' ? options.visible : true;
        this.filter =
            options && options.filterable === true
                ? filterProps(name)
                : { argument: [], operator: CompareOperators.NONE, hasFilter: false };
        this.filterable = (options && options.filterable) || false;

        this.filter.hasFilter = this.hasFilter;
    }
}
