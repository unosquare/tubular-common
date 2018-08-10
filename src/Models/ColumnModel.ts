import { AggregateFunctions, ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';
import IColumnModelOptions from './IColumnModelOptions';

function filterProps(name: string): object {
  return {
    Argument: [],
    HasFilter: false,
    Name: name,
    Operator: 'None',
    OptionsUrl: null,
    Text: null
  };
}

const NumericOperators = [
  { Value: CompareOperators.NONE, Title: 'None' },
  { Value: CompareOperators.EQUALS, Title: 'Equals' },
  { Value: CompareOperators.BETWEEN, Title: 'Between' },
  { Value: CompareOperators.GTE, Title: '>=' },
  { Value: CompareOperators.GT, Title: '>' },
  { Value: CompareOperators.LTE, Title: '<=' },
  { Value: CompareOperators.LT, Title: '<' }
];

const StringOperators = [
  { Value: CompareOperators.NONE, Title: 'None' },
  { Value: CompareOperators.EQUALS, Title: 'Equals' },
  { Value: CompareOperators.NOT_EQUALS, Title: 'Not Equals' },
  { Value: CompareOperators.CONTAINS, Title: 'Contains' },
  { Value: CompareOperators.NOT_CONTAINS, Title: 'Not Contains' },
  { Value: CompareOperators.STARTS_WITH, Title: 'Starts With' },
  { Value: CompareOperators.NOT_STARTS_WITH, Title: 'Not Starts With' },
  { Value: CompareOperators.ENDS_WITH, Title: 'Ends With' },
  { Value: CompareOperators.NOT_ENDS_WITH, Title: 'Not Ends With' }
];

const BooleanOperators = [
  { Value: CompareOperators.NONE, Title: 'None' },
  { Value: CompareOperators.EQUALS, Title: 'Equals' },
  { Value: CompareOperators.NOT_EQUALS, Title: 'Not Equals' }
];

export default class ColumnModel {
  public static sortColumnArray(columnName: string, columns: ColumnModel[], multiSort: boolean) {
    const column = columns.find((c: ColumnModel) => c.Name === columnName);
    if (!column) { return; }

    column.SortDirection = column.SortDirection === ColumnSortDirection.NONE
      ? ColumnSortDirection.ASCENDING
      : column.SortDirection === ColumnSortDirection.ASCENDING ?
        ColumnSortDirection.DESCENDING :
        ColumnSortDirection.NONE;

    column.SortOrder = column.SortDirection === ColumnSortDirection.NONE ? -1 : Number.MAX_VALUE;

    if (!multiSort) {
      columns
        .filter((col: any) => col.Name !== columnName)
        .forEach((c: any) => {
          c.SortOrder = -1;
          c.SortDirection = ColumnSortDirection.NONE;
        });
    }

    columns
      .filter((col: ColumnModel) => col.SortOrder > 0)
      .sort((a: ColumnModel, b: ColumnModel) => a.SortOrder === b.SortOrder ? 0 : (a.SortOrder > b.SortOrder ? 1 : -1))
      .forEach((col: any, i: number) => { col.SortOrder = i + 1; });

    return columns;
  }

  public Aggregate: AggregateFunctions;
  public DataType: ColumnDataType;
  public Filter: any;
  public IsKey: boolean;
  public Label: string;
  public Name: string;
  public Searchable: boolean;
  public SortDirection: ColumnSortDirection;
  public SortOrder: number;
  public Sortable: boolean;
  public Visible: boolean;

  public hasFilter = this.Filter &&
    (this.Filter.Text || this.Filter.Argument) &&
    this.Filter.Operator !== CompareOperators.NONE;

  constructor(name: string, options?: IColumnModelOptions) {
    this.Aggregate = options && options.Aggregate || AggregateFunctions.NONE;
    this.DataType = options && options.DataType || ColumnDataType.STRING;
    this.IsKey = options && options.IsKey || false;
    this.Label = options && options.Label || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2');
    this.Name = name;
    this.Searchable = options && options.Searchable || false;
    this.SortDirection = options && options.Sortable && options.SortDirection || ColumnSortDirection.NONE;
    this.SortOrder = options && this.SortDirection !== ColumnSortDirection.NONE && options.SortOrder || -1;
    this.Sortable = options && options.Sortable || false;
    this.Visible = options && typeof (options.Visible) === 'boolean' ? options.Visible : true;
    this.Filter = options && options.Filtering ? filterProps(name) : {};

    this.Filter.HasFilter = this.hasFilter;
  }

  public getOperators() {
    switch (this.DataType) {
      case ColumnDataType.STRING:
        return StringOperators;
      case ColumnDataType.NUMERIC:
      case ColumnDataType.DATE:
      case ColumnDataType.DATE_TIME:
      case ColumnDataType.DATE_TIME_UTC:
        return NumericOperators;
      case ColumnDataType.BOOLEAN:
        return BooleanOperators;
      default:
        return [];
    }
  }
}
