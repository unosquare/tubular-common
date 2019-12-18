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
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.Between, title: 'Between' },
    { value: CompareOperators.Gte, title: '>=' },
    { value: CompareOperators.Gt, title: '>' },
    { value: CompareOperators.Lte, title: '<=' },
    { value: CompareOperators.Lt, title: '<' },
];

const StringOperators = [
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.NotEquals, title: 'Not Equals' },
    { value: CompareOperators.Contains, title: 'Contains' },
    { value: CompareOperators.NotContains, title: 'Not Contains' },
    { value: CompareOperators.StartsWith, title: 'Starts With' },
    { value: CompareOperators.NotStartsWith, title: 'Not Starts With' },
    { value: CompareOperators.EndsWith, title: 'Ends With' },
    { value: CompareOperators.NotEndsWith, title: 'Not Ends With' },
];

const BooleanOperators = [
    { value: CompareOperators.None, title: 'None' },
    { value: CompareOperators.Equals, title: 'Equals' },
    { value: CompareOperators.NotEquals, title: 'Not Equals' },
];

export default class ColumnModel {
    public static createFilterPatch(column: ColumnModel): FilterWrapper {
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
            name: column.name,
            argument: [filterArgument],
            hasFilter: true,
            operator: column.filter.operator || CompareOperators.Auto,
            text: filterText,
        };
    }

    public static getOperators(column: ColumnModel): {}[] {
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
            column.sortDirection === ColumnSortDirection.None
                ? ColumnSortDirection.Ascending
                : column.sortDirection === ColumnSortDirection.Ascending
                ? ColumnSortDirection.Descending
                : ColumnSortDirection.None;

        column.sortOrder = column.sortDirection === ColumnSortDirection.None ? -1 : Number.MAX_VALUE;

        if (!multiSort) {
            columns
                .filter((col: ColumnModel) => col.name !== columnName)
                .forEach((c: ColumnModel) => {
                    c.sortOrder = -1;
                    c.sortDirection = ColumnSortDirection.None;
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

    public static clearFilterPatch(): FilterWrapper {
        return {
            argument: [''],
            hasFilter: false,
            operator: CompareOperators.None,
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
        this.filter && (this.filter.text || this.filter.argument) && this.filter.operator !== CompareOperators.None;

    constructor(name: string, options?: IColumnModelOptions) {
        this.aggregate = (options && options.aggregate) || AggregateFunctions.None;
        this.dataType = (options && options.dataType) || ColumnDataType.String;
        this.isKey = (options && options.isKey) || false;
        this.label = (options && options.label) || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2');
        this.name = name;
        this.searchable = (options && options.searchable) || false;
        this.sortDirection = (options && options.sortable && options.sortDirection) || ColumnSortDirection.None;
        this.sortOrder = (options && this.sortDirection !== ColumnSortDirection.None && options.sortOrder) || -1;
        this.sortable = (options && options.sortable) || false;
        this.visible = options && typeof options.visible === 'boolean' ? options.visible : true;
        this.filter =
            options && options.filterable === true
                ? filterProps(name)
                : { argument: [], operator: CompareOperators.None, hasFilter: false };
        this.filterable = (options && options.filterable) || false;

        this.filter.hasFilter = this.hasFilter;
    }
}
