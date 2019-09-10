import parseISO from 'date-fns/parseISO';
import {
    AggregateFunctions, ColumnSortDirection,
    CompareOperators
} from './Models';
import ColumnModel from './Models/ColumnModel';
import GridRequest from './Models/GridRequest';
import GridResponse from './Models/GridResponse';
import { parsePayload } from './utils';

const isEqual = (date1: any, date2: any) => parseISO(date1).getTime() === parseISO(date2).getTime();
const isAfter = (date1: any, date2: any) => parseISO(date1).getTime() > parseISO(date2).getTime();
const isBefore = (date1: any, date2: any) => parseISO(date1).getTime() < parseISO(date2).getTime();

export default class Transformer {

    public static getResponse(request: GridRequest, dataSource: any): GridResponse {
        const response = new GridResponse(request.Counter);
        response.TotalRecordCount = dataSource.length;

        let data = this.applyFreeTextSearch(request, dataSource);
        data = this.applyFiltering(request, data);
        data = this.applySorting(request, data);

        response.FilteredRecordCount = data.length;

        if (request.Take > -1) {
            response.TotalPages = Math.ceil(response.FilteredRecordCount / request.Take);

            if (response.TotalPages > 0) {
                response.CurrentPage = request.Skip / request.Take + 1;
            }
        }

        response.AggregationPayload = this.getAggregatePayload(request, data);

        response.Payload = data
            .slice(request.Skip, request.Skip + request.Take)
            .map((row: any) => parsePayload(row, request.Columns));

        return response;
    }

    private static applyFreeTextSearch(request: GridRequest, subset: any[]) {
        if (request.Search && request.Search.Operator.toLowerCase() === CompareOperators.AUTO.toLowerCase()) {
            const searchableColumns = request.Columns.filter((x: any) => x.Searchable);

            if (searchableColumns.length > 0) {
                const filter = request.Search.Text.toLowerCase();
                if (filter === '') { return subset; }

                return subset.filter((item) =>
                    searchableColumns.some((x: any) => {
                        if (typeof item[x.Name] === 'undefined') {
                            return false;
                        } else {
                            return item[x.Name].toLowerCase().indexOf(filter) > -1;
                        }
                    }));
            }

            return subset;
        }
    }

    private static applyFiltering(request: GridRequest, subset: any[]) {
        request.Columns
            .filter((column: ColumnModel) => column.hasFilter)
            .forEach((column: ColumnModel) => {
                const isDate = column.DataType === 'datetime' ||
                    column.DataType === 'date' ||
                    column.DataType === 'datetimeutc';

                const partialfiltering = (data: any[], action: (f: string) => boolean) => data.filter(
                    (row: any) => typeof row[column.Name] === 'undefined' || row[column.Name] === null
                        ? false
                        : action(row[column.Name]));

                switch (column.Filter.Operator) {
                    case CompareOperators.EQUALS:
                        if (isDate) {
                            subset = subset.filter((row) =>
                                isEqual(row[column.Name], column.Filter.Text));
                        } else if (column.DataType === 'string') {
                            subset = partialfiltering(subset,
                                (x: string) => x.toLowerCase() === column.Filter.Text.toLowerCase());
                        } else {
                            subset = subset.filter((row) =>
                                row[column.Name] === column.Filter.Text);
                        }
                        break;
                    case CompareOperators.NOT_EQUALS:
                        if (column.DataType === 'string') {
                            subset = partialfiltering(subset,
                                (x: string) => x.toLowerCase() !== column.Filter.Text.toLowerCase());
                        } else {
                            subset = subset.filter((row) =>
                                row[column.Name] !== column.Filter.Text);
                        }
                        break;
                    case CompareOperators.CONTAINS:
                        subset = partialfiltering(subset, (x) => x.toLowerCase()
                            .indexOf(column.Filter.Text.toLowerCase()) >= 0);
                        subset = partialfiltering(subset,
                            (x: string) => x.toLowerCase().indexOf(column.Filter.Text.toLowerCase()) >= 0);
                        break;
                    case CompareOperators.NOT_CONTAINS:
                        subset = partialfiltering(subset,
                            (x: string) => x.toLowerCase().indexOf(column.Filter.Text.toLowerCase()) < 0);
                        break;
                    case CompareOperators.STARTS_WITH:
                        subset = partialfiltering(subset,
                            (x: string) => x.toLowerCase().startsWith(column.Filter.Text.toLowerCase()));
                        break;
                    case CompareOperators.NOT_STARTS_WITH:
                        subset = partialfiltering(subset,
                            (x: string) => !x.toLowerCase().startsWith(column.Filter.Text.toLowerCase()));
                        break;
                    case CompareOperators.ENDS_WITH:
                        subset = partialfiltering(subset,
                            (x: string) => x.toLowerCase().endsWith(column.Filter.Text.toLowerCase()));
                    case CompareOperators.NOT_ENDS_WITH:
                        subset = partialfiltering(subset,
                            (x: string) => !x.toLowerCase().endsWith(column.Filter.Text.toLowerCase()));
                        break;
                    case CompareOperators.GT:
                        if (isDate) {
                            subset = subset.filter((row) =>
                                isAfter(row[column.Name], column.Filter.Text));
                        } else {
                            subset = subset.filter((row) => row[column.Name] > column.Filter.Text);
                        }
                        break;
                    case CompareOperators.GTE:
                        if (isDate) {
                            subset = subset.filter((row) =>
                                isEqual(row[column.Name], column.Filter.Text)
                                || isAfter(row[column.Name], column.Filter.Text));
                        } else {
                            subset = subset.filter((row) => row[column.Name] >= column.Filter.Text);
                        }
                        break;
                    case CompareOperators.LT:
                        if (isDate) {
                            subset = subset.filter((row) =>
                                isBefore(row[column.Name], column.Filter.Text));
                        } else {
                            subset = subset.filter((row) => row[column.Name] < column.Filter.Text);
                        }
                        break;
                    case CompareOperators.LTE:
                        if (isDate) {
                            subset = subset.filter((row) =>
                                isEqual(row[column.Name], column.Filter.Text)
                                || isBefore(row[column.Name], column.Filter.Text));
                        } else {
                            subset = subset.filter((row) => row[column.Name] <= column.Filter.Text);
                        }
                        break;
                    case CompareOperators.BETWEEN:
                        if (isDate) {
                            subset = subset.filter((row) =>
                                (isEqual(row[column.Name], column.Filter.Text)
                                    || isAfter(row[column.Name], column.Filter.Text)) &&
                                (isEqual(row[column.Name], column.Filter.Argument[0])
                                    || isBefore(row[column.Name], column.Filter.Argument[0])));
                        } else {
                            subset = subset.filter((row) => row[column.Name] >= column.Filter.Text &&
                                row[column.Name] <= column.Filter.Argument[0]);
                        }
                        break;
                    default:
                        throw new Error('Unsupported Compare Operator');
                }
            });

        return subset;
    }

    private static applySorting(request: GridRequest, subset: any[]) {
        const sortedColumns = request.Columns
            .filter((column: ColumnModel) => column.SortOrder > 0);

        let sorts: any[] = [
            { Name: request.Columns[0].Name, Asc: true }
        ];

        if (sortedColumns.length > 0) {
            sortedColumns.sort((a, b) => a.SortOrder > b.SortOrder ? 1 : b.SortOrder > a.SortOrder ? -1 : 0);

            sorts = sortedColumns
                .map((y: ColumnModel) => ({ Name: y.Name, Asc: y.SortDirection === ColumnSortDirection.ASCENDING }));
        }

        subset.sort((a, b) => {
            let result = 0;

            for (const current of sorts) {
                const reverse = current.Asc ? 1 : -1;

                if (typeof a[current.Name] === 'undefined' || typeof b[current.Name] === 'undefined') {
                    result = reverse * -1;
                    break;
                }

                if (a[current.Name] < b[current.Name]) {
                    result = reverse * -1;
                    break;
                }
                if (a[current.Name] > b[current.Name]) {
                    result = reverse * 1;
                    break;
                }
            }

            return result;
        });

        return subset;
    }

    private static getAggregatePayload(request: GridRequest, subset: any[]) {
        const aggregateColumns = request.Columns
            .filter((column: ColumnModel) =>
                column.Aggregate && column.Aggregate.toLowerCase() !== AggregateFunctions.NONE.toLowerCase());

        return aggregateColumns.reduce((prev: any, column: ColumnModel) => {
            switch (column.Aggregate.toLowerCase()) {
                case AggregateFunctions.SUM.toLowerCase():
                    prev[column.Name] = subset.length === 0
                        ? 0
                        : subset.reduce((sum, r) => typeof r[column.Name] === 'undefined'
                            ? sum
                            : sum + r[column.Name], 0);
                    break;
                case AggregateFunctions.AVERAGE.toLowerCase():
                    prev[column.Name] = subset.length === 0
                        ? 0
                        : subset.reduce((sum, r) => typeof r[column.Name] === 'undefined'
                            ? sum
                            : sum + r[column.Name], 0)
                        / subset.length;
                    break;
                case AggregateFunctions.MAX.toLowerCase():
                    prev[column.Name] = subset.length === 0 ? 0
                        : subset.reduce((max, r) => r[column.Name] > max ? r[column.Name] : max,
                            subset[0][column.Name]);
                    break;
                case AggregateFunctions.MIN.toLowerCase():
                    prev[column.Name] = subset.length === 0 ? 0
                        : subset.reduce((min, r) => r[column.Name] < min ? r[column.Name] : min,
                            subset[0][column.Name]);
                    break;
                case AggregateFunctions.COUNT.toLowerCase():
                    prev[column.Name] = subset.length;
                    break;
                case AggregateFunctions.DISTINCT_COUNT.toLowerCase():
                    prev[column.Name] = subset.length === 0 ? 0
                        : subset.reduce((list, r) => {
                            if (list.indexOf(r[column.Name]) === -1) { list.push(r[column.Name]); }
                            return list;
                        }, []).length;
                    break;
                default:
                    throw new Error('Unsupported aggregate function');
            }

            return prev;
        }, {});
    }
}
